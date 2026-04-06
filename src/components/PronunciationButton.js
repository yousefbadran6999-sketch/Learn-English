import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

export default function PronunciationButton({ phrase }) {
  const speak = () => {
    Speech.speak(phrase, {
      language: 'en-US',
      pitch: 1,
      rate: 0.85,
      voice: 'com.apple.ttsbundle.samantha-premium',
    });
  };

  return (
    <TouchableOpacity style={styles.button} onPress={speak}>
      <Text style={styles.text}>🔊 استمع للنطق الأمريكي</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2ecc71',
    padding: 16,
    borderRadius: 30,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
