/** @format */

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ColorCounter = ({ color, onIncrease, onDecrease }) => {
  return (
    <View>
      <View style={{ margin: 10 }}>
        <Button title={`Increase ${color}`} onPress={() => onIncrease()} />
      </View>
      <View style={{ margin: 10 }}>
        <Button title={`Decrease ${color}`} onPress={() => onDecrease()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ColorCounter;
