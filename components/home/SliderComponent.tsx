import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';
export default function SliderComponent() {
    const [sliderValue, setSliderValue] = useState<number>(0);
  
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Slider Value: {sliderValue}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#007AFF"
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: 18,
      marginBottom: 20,
    },
    slider: {
      width: 300,
      height: 40,
    },
  });