import { useState } from "react";

import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import CustomField from "../../CustomField";
import { vehicleStore } from "../../../stores";
import { Vehicle } from "../../../types";
import { FormButton } from "../../FormButton";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { showMessage } from "react-native-flash-message";
import { Image, Pressable, View, Platform, PermissionsAndroid } from "react-native";

import {
  launchCamera,
  launchImageLibrary,
  type Asset,
} from "react-native-image-picker";

import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import { DatePickerField } from "../../DatePickerField";
import { useTheme } from "../../../theme/ThemeContext";
import { useTranslation } from "react-i18next";


type Props = {
  onClose: ()=>void;
}

export const AddVehicleSheet =({onClose}: Props)=> {
  const [brand, setMake] = useState<Vehicle["brand"]>('');
  const [model, setModel] = useState<Vehicle["model"]>('');
  const [plateNumber, setRegistrationNumber] = useState<Vehicle['plateNumber']>('');
  const [year, setYear] = useState<Vehicle["year"] | string>("");
  const [mileage, setMileage] = useState<Vehicle["mileage"]| string>("");
  const [vin, setVin] = useState<string>("");
  const [fuel, setFuelType] = useState<Vehicle["fuel"]>('Diesel');
  const [status, setStatus] = useState<Vehicle["status"]>("active");
  const [vehicleImage, setVehicleImage] = useState<Asset | null>(null);

  const [firstRegistrationDate, setFirstRegistrationDate] =
    useState<string | null>(null);

  const [inspectionDate, setInspectionDate] =
    useState<string | null>(null);


  const [error, setError] = useState<string>("");

  const {theme} = useTheme();
  const {t} = useTranslation();


  const validateForm = (): boolean => {
    if (!brand.trim()) {
      setError("Enter vehicle make");
      showMessage({
        type: "danger",
        message: t("vehicles.form.errors.makeRequired"),
        description: t("vehicles.form.errors.makeRequiredDescription"),
      });
      return false;
    }

    if (!model.trim()) {
      setError("Enter vehicle model");
      showMessage({
        type: "danger",
        message: t("vehicles.form.errors.modelRequired"),
        description: t("vehicles.form.errors.modelRequiredDescription"),
      });
      return false;
    }

    if (!plateNumber.trim()) {
      setError("Enter registration number");
      showMessage({
        type: "danger",
        message: t("vehicles.form.errors.registrationRequired"),
        description: t("vehicles.form.errors.registrationRequiredDescription"),
      });
      return false;
    }

    const currentYear = new Date().getFullYear();
    const parsedYear = Number(year);

    if (
      !String(year).trim() ||
      !Number.isInteger(parsedYear) ||
      parsedYear < 1886 ||
      parsedYear > currentYear + 1
    ) {
      setError("Enter a valid vehicle year");
      showMessage({
        type: "danger",
        message: t("vehicles.form.errors.invalidYear"),
        description: `${t("vehicles.form.errors.invalidYearDescription")} ${currentYear + 1}.`,
      });
      return false;
    }

    if (
      mileage !== "" &&
      (!Number.isFinite(Number(mileage)) || Number(mileage) < 0)
    ) {
      setError("Enter a valid mileage");
      showMessage({
        type: "danger",
        message: t("vehicles.form.errors.invalidMileage"),
        description: t("vehicles.form.errors.invalidMileageDescription"),
      });
      return false;
    }

    if (vin.trim() && !/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin.trim())) {
      setError("Enter a valid VIN");
      showMessage({
        type: "danger",
        message: t("vehicles.form.errors.invalidVIN"),
        description: t("vehicles.form.errors.invalidVINDescription"),
      });
      return false;
    }

    if (
      firstRegistrationDate &&
      inspectionDate &&
      inspectionDate < firstRegistrationDate
    ) {
      setError("Invalid inspection date");
      showMessage({
        type: "danger",
        message: t("vehicles.form.errors.invalidInspection"),
        description:
          t("vehicles.form.errors.invalidInspectionDescription"),
      });
      return false;
    }

    setError("");
    return true;
  };


  const requestCameraPermission = async (): Promise<boolean> => {
    if (Platform.OS === "android") {
      const permission = PermissionsAndroid.PERMISSIONS.CAMERA;

      const result = await PermissionsAndroid.request(permission);

      return result === PermissionsAndroid.RESULTS.GRANTED;
    }

    const permission = PERMISSIONS.IOS.CAMERA;
    const currentStatus = await check(permission);

    if (currentStatus === RESULTS.GRANTED) {
      return true;
    }

    const result = await request(permission);

    return result === RESULTS.GRANTED;
  };

  const takeVehiclePhoto = async () => {
    try {
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) {
        showMessage({
          type: "warning",
          message: "Camera permission required",
          description: "Allow camera access in your device settings.",
        });
        return;
      }

      const result = await launchCamera({
        mediaType: "photo",
        cameraType: "back",
        quality: 0.8,
        maxWidth: 1600,
        maxHeight: 1600,
        saveToPhotos: false,
      });

      if (result.didCancel) return;

      if (result.errorCode) {
        showMessage({
          type: "danger",
          message: "Unable to take photo",
          description: result.errorMessage ?? "Please try again.",
        });
        return;
      }

      if (result.assets?.[0]) {
        setVehicleImage(result.assets[0]);
      }
    } catch (error) {
      showMessage({
        type: "danger",
        message: "Camera error",
        description: "Something went wrong while opening the camera.",
      });
    }
  };

  const chooseVehiclePhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: "photo",
        selectionLimit: 1,
        quality: 0.8,
        maxWidth: 1600,
        maxHeight: 1600,
      });

      if (result.didCancel) return;

      if (result.errorCode) {
        showMessage({
          type: "danger",
          message: "Unable to select photo",
          description: result.errorMessage ?? "Please try again.",
        });
        return;
      }

      if (result.assets?.[0]) {
        setVehicleImage(result.assets[0]);
      }
    } catch (error) {
      showMessage({
        type: "danger",
        message: "Gallery error",
        description: "Something went wrong while opening the gallery.",
      });
    }
  };

  const removeVehiclePhoto = () => {
    setVehicleImage(null);
  };

  const toDate = (value: string | null): Date | undefined => {
    if (!value) return undefined;

    const [year, month, day] = value.split("-").map(Number);

    return new Date(year, month - 1, day);
  };
  const addVehicle = () => {
    if (!validateForm()) {
      return;
    }
    if (brand && model && plateNumber && year && fuel && status) {
      setError("");
      vehicleStore.addVehicle({
        brand,
        model,
        plateNumber,
        year: Number(year),
        mileage: Number(mileage),
        VIN: vin,
        fuel,
        status,
        firstRegistration: toDate(firstRegistrationDate),
        inspectionDate: toDate(inspectionDate),

        imageUri: vehicleImage?.uri
      });
      showMessage({
        type: "success",
        message: t("vehicles.form.addMessage"),
      });
      onClose();
      
    }
    else {
      showMessage({
        type: "danger",
        message: "Fill all fields",
        description: "You should fill all fields"
      })
      setError("Fill all fields");
    }
  }

  return (
    <BottomSheetScrollView style={styles.container}>
      <AppText style={styles.title}>
        {t("vehicles.form.titleAdd")}
      </AppText>

      <PlainText style={styles.description}>
        {t("vehicles.form.descriptionAdd")}
      </PlainText>

      <View style={styles.imageSection}>
        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <AppText style={styles.imageLabel}>
            {t("vehicles.form.labels.vehiclePhoto")}
          </AppText>
          <PlainText style={styles.optional}>{t("vehicles.form.labels.optional")}</PlainText>

        </View>
        
        <Pressable
          style={styles.imagePicker}
          onPress={chooseVehiclePhoto}
        >
          {vehicleImage?.uri ? (
            <Image
              source={{ uri: vehicleImage.uri }}
              style={styles.vehicleImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.imagePlaceholder, {backgroundColor:theme.card, borderColor:theme.card}]}>
              <AppText style={styles.imageIcon}>+</AppText>

              <AppText style={styles.imagePickerTitle}>
                {t("vehicles.form.labels.addVehiclePhoto")}
              </AppText>

              <PlainText style={styles.imagePickerDescription}>
                {t("vehicles.form.labels.addVehiclePhotoDescription")}
              </PlainText>
            </View>
          )}
        </Pressable>

        <View style={styles.imageActions}>
          <Pressable
            style={[styles.imageActionButton, {backgroundColor: theme.card}]}
            onPress={takeVehiclePhoto}
          >
            <AppText style={[styles.imageActionText, {color:theme.text}]}>
              {t("vehicles.form.labels.takePhoto")}
            </AppText>
          </Pressable>

          <Pressable
            style={[styles.imageActionButton, {backgroundColor: theme.card}]}
            onPress={chooseVehiclePhoto}
          >
            <AppText style={[styles.imageActionText, {color:theme.text}]}>
              {t("vehicles.form.labels.choosePhoto")}
            </AppText>
          </Pressable>
        </View>

        {vehicleImage?.uri && (
          <Pressable onPress={removeVehiclePhoto}>
            <AppText style={styles.removeImageText}>
              {t("vehicles.form.labels.removePhoto")}
            </AppText>
          </Pressable>
        )}
      </View>

      

        <View style={styles.row}>
          <CustomField
            type="text"
            label={t("vehicles.form.labels.make")}
            value={brand}
            onChangeText={setMake}
            placeholder="Ford"
            containerStyle={styles.half}
          />

          <CustomField
            type="text"
            label={t("vehicles.form.labels.model")}
            value={model}
            onChangeText={setModel}
            placeholder="Transit"
            containerStyle={styles.half}
          />
        </View>
        

        <CustomField
          type="text"
          label={t("vehicles.form.labels.registration")}
          value={plateNumber}
          onChangeText={setRegistrationNumber}
          placeholder="AB 1234 CD"
          containerStyle={styles.field}
        />


        <View style={styles.row}>
          <CustomField
            type="number"
            label={t("vehicles.form.labels.year")}
            value={String(year)}
            onChangeText={setYear}
            placeholder="2024"
            keyboardType="number-pad"
            maxLength={4}
            containerStyle={styles.half}
          />

          <CustomField
            type="number"
            label={t("vehicles.form.labels.mileage")}
            value={String(mileage)}
            onChangeText={setMileage}
            suffix="km"
            placeholder="0"
            optional
            keyboardType="numeric"
            containerStyle={styles.half}
          />
        </View>
        
        <CustomField
          type="text"
          label={t("vehicles.form.labels.VIN")}
          value={vin}
          onChangeText={setVin}
          placeholder="WBACV62090LM12345"
          containerStyle={styles.field}
          optional
        />
        <DatePickerField
          label={t("vehicles.form.labels.firstRegistrationDate")}
          value={firstRegistrationDate}
          onChange={setFirstRegistrationDate}
          placeholder={t("vehicles.form.labels.selectRegistrationDate")}
          optional
          maximumDate={new Date()}
        />

        <DatePickerField
          label={t("vehicles.form.labels.inspectionDate")}
          value={inspectionDate}
          onChange={setInspectionDate}
          placeholder={t("vehicles.form.labels.selectInspectionDate")}
          optional
        />

        <CustomField
          type="segmented"
          label={t("vehicles.form.labels.fuelType")}
          value={fuel}
          onChangeText={setFuelType}
          options={[
            {
              option: "Petrol",
              title: t("vehicles.form.labels.fuel.petrol")
            },
            {
              option: "Diesel",
              title: t("vehicles.form.labels.fuel.diesel")
            },
            {
              option: "Hybrid",
              title: t("vehicles.form.labels.fuel.diesel")
            },
            {
              option: "Electric",
              title: t("vehicles.form.labels.fuel.electric")
            },
          ]}
          containerStyle={styles.field}
        />
        <CustomField
          type="segmented"
          label={t("vehicles.form.labels.status")}
          value={status}
          onChangeText={setStatus}
          options={[
            {
              option: 'active',
              title: t("vehicles.form.labels.statuses.active"),
            },
            {
              option: 'maintenance',
              title: t("vehicles.form.labels.statuses.in_maintenance")
            }, 
            {
              option: 'inactive',
              title: t("vehicles.form.labels.statuses.inactive")
            }
          ]}
          containerStyle={styles.field}
        />


        <View style={styles.actions}>
          <FormButton
            onPress={addVehicle}
          >
            <AppText style={{color: "#fff", fontSize: 22}}>{t("vehicles.form.addButton")}</AppText>
          </FormButton>
        </View>

    </BottomSheetScrollView>
  );
}