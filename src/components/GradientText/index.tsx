import React, { ReactNode } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { AppText } from '../AppText';
import { colors } from '../../theme/colors';

type Props = {
  title: string;
  style: StyleProp<TextStyle>;
}

export default function GradientText({title, style}:Props) {
  return (
    <MaskedView
      maskElement={
        <AppText style={[styles.text, style]}>{title}</AppText>
      }
    >
      <LinearGradient
        colors={[colors.primaryColor, colors.secondaryColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <AppText style={[styles.text, style, { opacity: 0 }]}>
          {title}
        </AppText>
      </LinearGradient>
    </MaskedView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
  },
});