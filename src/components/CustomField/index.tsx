import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { styles } from './styles';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../AppText';
import { useTranslation } from 'react-i18next';

// 1. Додаємо 'password' до типів
type FieldType = 'text' | 'number' | 'segmented' | 'password';

interface CustomFieldProps<T extends string = string> {
  type: FieldType;
  label?: string;
  value: T;
  onChangeText?: (value: T) => void;
  placeholder?: string;

  suffix?: string;
  optional?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  maxLength?: number;

  options?: {
    option: string;
    title: string;
  }[];

  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;

  editable?: boolean;
  isTextArea?: boolean;
}

const COLORS = {
  text: '#192235',
  placeholder: '#78849F',
  border: '#DCE2F0',
  background: '#FFFFFF',
  segmentedBackground: '#EEF0F7',
  activeBackground: '#FFFFFF',
};

function CustomField<T extends string = string>({
  type,
  label,
  value,
  onChangeText,
  placeholder,
  suffix,
  optional = false,
  keyboardType,
  maxLength,
  options = [],
  containerStyle,
  inputStyle,
  labelStyle,
  editable = true,
  isTextArea,
}: CustomFieldProps<T>) {
  const { theme } = useTheme();
  const {t} = useTranslation();

  const [isPasswordHidden, setIsPasswordHidden] = useState(type === 'password');

  const renderTextInput = () => {
    const isPassword = type === 'password';

    return (
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={text => onChangeText?.(text as T)}
          placeholder={placeholder}
          placeholderTextColor="#666666"
          keyboardType={
            keyboardType ?? (type === 'number' ? 'numeric' : 'default')
          }
          maxLength={maxLength}
          editable={editable}
          style={[styles.input, inputStyle, { color: theme.text }]}
          underlineColorAndroid="transparent"
          selectionColor={theme.text}
          multiline={isTextArea}

          secureTextEntry={isPassword ? isPasswordHidden : false}
          autoCapitalize={isPassword ? 'none' : undefined}
          autoCorrect={isPassword ? false : undefined}
        />

        {isPassword ? (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsPasswordHidden(prev => !prev)}
            style={styles.suffix}
          >
            <Text style={{ color: theme.text }}>
              {isPasswordHidden ? 'Show' : 'Hide'}
            </Text>
          </TouchableOpacity>
        ) : suffix ? (
          <Text style={[styles.suffix, { color: theme.text }]}>
            {suffix}
          </Text>
        ) : null}
      </View>
    );
  };

  const renderSegmented = () => (
    <View style={[styles.segmentedContainer, { backgroundColor: theme.card }]}>
      {options.map(option => {
        const isActive = value === option.option;

        return (
          <TouchableOpacity
            key={option.option}
            activeOpacity={0.8}
            disabled={!editable}
            onPress={() => onChangeText?.(option.option as T)}
            style={[
              styles.segment,
              isActive && { backgroundColor: theme.background, color: theme.text },
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.segmentText,
                { color: theme.text },
                isActive && styles.activeSegmentText,
              ]}
            >
              {option.title.charAt(0).toUpperCase() + option.title.slice(1)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? (
        <View style={styles.labelContainer}>
          <AppText style={[styles.label, labelStyle, { color: theme.text }]}>
            {label}
          </AppText>

          {optional ? (
            <AppText style={styles.optional}>{t("common.optional")}</AppText>
          ) : null}
        </View>
      ) : null}

      {type === 'segmented' ? renderSegmented() : renderTextInput()}
    </View>
  );
}

export default CustomField;