import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function listedcom() {
  
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