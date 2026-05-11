import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radii } from '../theme';

export default function ListedCom() {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => setIsRevealed(true)} activeOpacity={0.9}>
        <Text style={styles.buttonText}>Listed</Text>
      </TouchableOpacity>

      {isRevealed && (
        <View style={styles.resultBox}>
          <Text style={styles.nameText}>listed name </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: radii.sm,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  resultBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: colors.bgCard,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  nameText: {
    color: colors.textMain,
    fontSize: 16,
  },
});
