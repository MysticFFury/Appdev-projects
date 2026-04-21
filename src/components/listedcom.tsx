import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ListedCom() {

  const [isRevealed, setIsRevealed] = useState(false);

    return (
      <View style={styles.container}>

        {/* The Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsRevealed(true)}
        >
          <Text style={styles.buttonText}>Listed </Text>
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
    backgroundColor: '#FF6B00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  resultBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#161922',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#232836',
  },
  nameText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
