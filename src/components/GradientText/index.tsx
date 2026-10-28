import React from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { Text, StyleSheet } from 'react-native';
import { AppText } from '../AppText';

export default function GradientText() {
  return (
    <MaskedView
      maskElement={
        <Text style={styles.text}>Hello React Native</Text>
      }
    >
      <LinearGradient
        colors={['#6366F1', '#EC4899']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <AppText style={[styles.text, { opacity: 0 }]}>
          Hello React Native
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