import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TextInputProps,
} from 'react-native';
import { styles } from './styles';

type FieldType = 'text' | 'number' | 'segmented';

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

  options?: readonly T[];

  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;

  editable?: boolean;
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
}: CustomFieldProps<T>) {
  const renderTextInput = () => {
    return (
      <View style={styles.inputContainer}>
        <TextInput
        value={value}
        onChangeText={text => onChangeText?.(text as T)}
        placeholder={placeholder}
        placeholderTextColor={COLORS.placeholder}
        keyboardType={
          keyboardType ??
          (type === 'number' ? 'numeric' : 'default')
        }
        maxLength={maxLength}
        editable={editable}
        style={[styles.input, inputStyle]}
        underlineColorAndroid="transparent"
      />

        {suffix ? (
          <Text style={styles.suffix}>
            {suffix}
          </Text>
        ) : null}

      </View>
    );
  };

  const renderSegmented = () => (
    <View style={styles.segmentedContainer}>
      {options.map(option => {
        const isActive = value === option;

        return (
          <TouchableOpacity
            key={option}
            activeOpacity={0.8}
            disabled={!editable}
            onPress={() => onChangeText?.(option)}
            style={[
              styles.segment,
              isActive && styles.activeSegment,
            ]}
          >
            <Text
              numberOfLines={1}
              style={[
                styles.segmentText,
                isActive && styles.activeSegmentText,
              ]}
            >
              {option.charAt(0).toUpperCase() + option.slice(1)}
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
          <Text style={[styles.label, labelStyle]}>
            {label}
          </Text>

          {optional ? (
            <Text style={styles.optional}>Optional</Text>
          ) : null}
        </View>
      ) : null}

      {type === 'segmented'
        ? renderSegmented()
        : renderTextInput()}
    </View>
  );
};



export default CustomField;