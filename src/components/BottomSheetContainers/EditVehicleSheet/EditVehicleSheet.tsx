import { useState } from "react";

import { AppText } from "../../AppText";
import { styles } from "./styles";
import { PlainText } from "../../PlainText";
import CustomField from "../../CustomField";
import { vehicleStore } from "../../../stores";
import { Vehicle } from "../../../types";
import { FormButton } from "../../FormButton";

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
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";


type Props = {
  onClose: ()=>void;
  vehicle: Vehicle;
}

const formatDateForPicker = (date: Date | null | undefined): string | null => {
  if (!date) return null;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};


export const EditVehicleSheet =({onClose, vehicle}: Props)=> {
  const [brand, setMake] = useState<Vehicle["brand"]>(vehicle.brand);
  const [model, setModel] = useState<Vehicle["model"]>(vehicle.model);
  const [plateNumber, setRegistrationNumber] = useState<Vehicle['plateNumber']>(vehicle.plateNumber);
  const [year, setYear] = useState<Vehicle["year"] | string>(vehicle.year);
  const [mileage, setMileage] = useState<Vehicle["mileage"]| string>(vehicle.mileage ?? "");
  const [vin, setVin] = useState<string>(vehicle.VIN ?? "");
  const [fuel, setFuelType] = useState<Vehicle["fuel"]>(vehicle.fuel);
  const [status, setStatus] = useState<Vehicle["status"]>(vehicle.status);
  const [vehicleImage, setVehicleImage] = useState<
  Asset | { uri: string } | number | null
>(
  vehicle.imageUri
    ? typeof vehicle.imageUri === "number"
      ? vehicle.imageUri
      : { uri: vehicle.imageUri }
    : null
);

  const [firstRegistrationDate, setFirstRegistrationDate] =
    useState<string | null>(formatDateForPicker(vehicle.firstRegistration));

  const [inspectionDate, setInspectionDate] =
    useState<string | null>(formatDateForPicker(vehicle.inspectionDate));


  const [error, setError] = useState<string>("");

  const {theme} = useTheme();


  const validateForm = (): boolean => {
    if (!brand.trim()) {
      setError("Enter vehicle make");
      showMessage({
        type: "danger",
        message: "Make is required",
        description: "Please enter the vehicle make.",
      });
      return false;
    }

    if (!model.trim()) {
      setError("Enter vehicle model");
      showMessage({
        type: "danger",
        message: "Model is required",
        description: "Please enter the vehicle model.",
      });
      return false;
    }

    if (!plateNumber.trim()) {
      setError("Enter registration number");
      showMessage({
        type: "danger",
        message: "Registration number is required",
        description: "Please enter the vehicle registration number.",
      });
      return false;
    }

    const currentYear = new Date().getFullYear();
    const parsedYear = Number(year);

    if (
      !String(year).trim() ||
      !Number.isInteger(parsedYear) ||
      parsedYear < 1886 ||
      parsedYear > currentYear + 6
    ) {
      setError("Enter a valid vehicle year");
      showMessage({
        type: "danger",
        message: "Invalid year",
        description: `Enter a year between 1886 and ${currentYear + 6}.`,
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
        message: "Invalid mileage",
        description: "Mileage must be a non-negative number.",
      });
      return false;
    }

    if (vin.trim() && !/^[A-HJ-NPR-Z0-9]{17}$/i.test(vin.trim())) {
      setError("Enter a valid VIN");
      showMessage({
        type: "danger",
        message: "Invalid VIN",
        description: "VIN must contain 17 valid letters and numbers.",
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
        message: "Invalid inspection date",
        description:
          "Inspection date cannot be earlier than the first registration date.",
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
  const editVehicle = () => {
    if (!validateForm()) {
      return;
    }
    if (brand && model && plateNumber && year && fuel && status) {
      setError("");
      vehicleStore.updateVehicle(vehicle.id, {
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

        imageUri:vehicleImage === null
            ? undefined
            : typeof vehicleImage === "number"
              ? vehicleImage
              : vehicleImage.uri
      });
      showMessage({
        type: "success",
        message: "Vehicle was updated",
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
      <AppText style={[styles.title, {color:theme.text}]}>
        Edit vehicle
      </AppText>

      <PlainText style={styles.description}>
        You can edit a vehicle or fulfill the empty fields.
      </PlainText>

      <View style={styles.imageSection}>
        <View style={{flexDirection:"row", justifyContent:"space-between", paddingVertical:10}}>
          <AppText style={styles.imageLabel}>
            Vehicle photo
          </AppText>
          <PlainText style={styles.optional}>Optional</PlainText>

        </View>
        
        <Pressable
          style={styles.imagePicker}
          onPress={chooseVehiclePhoto}
        >
          {vehicleImage ? (
            <Image
              source={
                typeof vehicleImage === "number"
                  ? vehicleImage
                  : { uri: vehicleImage.uri }
              }
              style={styles.vehicleImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.imagePlaceholder}>
              <AppText style={styles.imageIcon}>+</AppText>

              <AppText style={styles.imagePickerTitle}>
                Add vehicle photo
              </AppText>

              <PlainText style={styles.imagePickerDescription}>
                Choose a photo from your gallery
              </PlainText>
            </View>
          )}
        </Pressable>

        <View style={styles.imageActions}>
          <Pressable
            style={styles.imageActionButton}
            onPress={takeVehiclePhoto}
          >
            <AppText style={styles.imageActionText}>
              Take photo
            </AppText>
          </Pressable>

          <Pressable
            style={styles.imageActionButton}
            onPress={chooseVehiclePhoto}
          >
            <AppText style={styles.imageActionText}>
              Choose from gallery
            </AppText>
          </Pressable>
        </View>

        {vehicleImage && (
          <Pressable onPress={removeVehiclePhoto}>
            <AppText style={styles.removeImageText}>
              Remove photo
            </AppText>
          </Pressable>
        )}
      </View>

      

        <View style={styles.row}>
          <CustomField
            type="text"
            label="Make"
            value={brand}
            onChangeText={setMake}
            placeholder="e.g. Ford"
            containerStyle={styles.half}
          />

          <CustomField
            type="text"
            label="Model"
            value={model}
            onChangeText={setModel}
            placeholder="e.g. Transit"
            containerStyle={styles.half}
          />
        </View>
        

        <CustomField
          type="text"
          label="Registration number"
          value={plateNumber}
          onChangeText={setRegistrationNumber}
          placeholder="AB 1234 CD"
          containerStyle={styles.field}
        />


        <View style={styles.row}>
          <CustomField
            type="number"
            label="Year"
            value={String(year)}
            onChangeText={setYear}
            placeholder="2024"
            keyboardType="number-pad"
            maxLength={4}
            containerStyle={styles.half}
          />

          <CustomField
            type="number"
            label="Mileage"
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
          label="VIN"
          value={vin}
          onChangeText={setVin}
          placeholder="WBACV62090LM12345"
          containerStyle={styles.field}
          optional
        />
        <DatePickerField
          label="First registration date"
          value={firstRegistrationDate}
          onChange={setFirstRegistrationDate}
          placeholder="Select registration date"
          optional
          maximumDate={new Date()}
        />

        <DatePickerField
          label="Inspection date"
          value={inspectionDate}
          onChange={setInspectionDate}
          placeholder="Select inspection date"
          optional
        />

        <CustomField
          type="segmented"
          label="Fuel type"
          value={fuel}
          onChangeText={setFuelType}
          options={[
            {
              option: "Petrol",
              title: "Petrol"
            },
            {
              option: "Diesel",
              title: "Diesel"
            },
            {
              option: "Hybrid",
              title: "Hybrid"
            },
            {
              option: "Electric",
              title: "Electric"
            },
          ]}
          containerStyle={styles.field}
        />
        <CustomField
          type="segmented"
          label="Status"
          value={status}
          onChangeText={setStatus}
          options={[
            {
              option: 'active',
              title: 'Active',
            },
            {
              option: 'maintenance',
              title: "In maintenance"
            }, 
            {
              option: 'inactive',
              title: 'Inactive'
            }
          ]}
          containerStyle={styles.field}
        />


        <View style={styles.actions}>
          <FormButton
            onPress={editVehicle}
          >
            <AppText style={{color: "#fff", fontSize: 22}}>Update vehicle</AppText>
          </FormButton>
        </View>

    </BottomSheetScrollView>
  );
}