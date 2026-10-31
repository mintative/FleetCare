
import { useState } from "react";
import {
  Platform,
  Pressable,
  View,
} from "react-native";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";

import { AppText } from "../AppText";
import { PlainText } from "../PlainText";
import { styles } from "./styles";
import CrossIcon from "../../assets/icons/cross.svg";
import { useTheme } from "../../theme/ThemeContext";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../localization/LangContext";

type Props = {
  label: string;
  value: string | null;
  onChange: (date: string | null) => void;
  placeholder?: string;
  optional?: boolean;
  maximumDate?: Date;
  minimumDate?: Date;
};

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};


const toDateString = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};


const parseDate = (value: string | null): Date => {
  if (value) {
    const [year, month, day] = value.split("-").map(Number);

    if (year && month && day) {
      return new Date(year, month - 1, day);
    }
  }

  return new Date();
};

export const DatePickerField = ({
  label,
  value,
  onChange,
  placeholder = "Select date",
  optional = false,
  maximumDate,
  minimumDate,
}: Props) => {
  const [showIOSPicker, setShowIOSPicker] = useState(false);
  const {theme} = useTheme();
  const {t} = useTranslation();
  const {currentLanguage} = useLanguage();

  const selectedDate = parseDate(value);

  const openPicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: selectedDate,
        mode: "date",
        display: "calendar",
        maximumDate,
        minimumDate,
        onValueChange: (_event, date) => {
          if (date) {
            onChange(toDateString(date));
          }
        },
      });

      return;
    }

    setShowIOSPicker((previous) => !previous);
  };

  const clearDate = () => {
    onChange(null);
    setShowIOSPicker(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <AppText style={styles.label}>{label}</AppText>

        {optional && (
          <PlainText style={styles.optional}>
            {t("common.optional")}
          </PlainText>
        )}
      </View>

      <View style={styles.inputRow}>
        <Pressable
          style={[styles.dateButton, {backgroundColor:theme.background}]}
          onPress={openPicker}

        >
          <AppText
            style={[
              styles.dateText,
              {color:theme.text},
              !value && styles.placeholder,
            ]}
          >
            {value ? formatDate(selectedDate) : placeholder}
          </AppText>

        </Pressable>

        {value && optional && (
          <Pressable

            onPress={clearDate}
            accessibilityRole="button"
            accessibilityLabel={`Clear ${label}`}
          >
            <CrossIcon/>
          </Pressable>
        )}
      </View>

      {Platform.OS === "ios" && showIOSPicker && (
        <View style={[styles.pickerContainer, {backgroundColor:theme.card}]}>
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="spinner"
            locale={currentLanguage}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            onChange={(_event, date) => {
              if (date) {
                onChange(toDateString(date));
              }
            }}
            textColor={theme.text}
            
          />

          <Pressable
            style={styles.doneButton}
            onPress={() => setShowIOSPicker(false)}
          >
            <AppText style={styles.doneText}>
              {t("common.done")}
            </AppText>
          </Pressable>
        </View>
      )}
    </View>
  );
};
