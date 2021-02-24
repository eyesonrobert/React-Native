/** @format */

import React, { useReducer, useContext, useState } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
import Spacer from '../components/Spacer';
import { Context } from '../context/ColorContext';
import { ColorPicker } from 'react-native-color-picker';

hexToRgb = (hex) => {
  let color = hex.replace('#', '');
  let bigint = parseInt(color, 16);
  let red = (bigint >> 16) & 255;
  let green = (bigint >> 8) & 255;
  let blue = bigint & 255;

  return { red, green, blue };
};

const SquareScreen = ({ navigation }) => {
  const [playerNumber, setPlayerNumber] = useState(
    navigation.getParam('playerNumber')
  );

  const { setPlayer1Color, setPlayer2Color } = useContext(Context);

  return (
    <View>
      <Spacer>
        <Text style={styles.saveText}>Tap Center to Save Color Choice</Text>
      </Spacer>
      <ColorPicker
        onColorSelected={(color) => {
          let newColor = hexToRgb(color);
          if (playerNumber === 'Player 1') {
            setPlayer1Color(newColor.red, newColor.green, newColor.blue, () =>
              navigation.navigate('Home')
            );
          } else {
            setPlayer2Color(newColor.red, newColor.green, newColor.blue, () =>
              navigation.navigate('Home')
            );
          }
        }}
        style={styles.colorWheel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  colorWheel: {
    height: 500,
    width: 350,
    marginLeft: 15,
  },
  saveText: {
    fontSize: 20,
    color: 'black',
    zIndex: 1,
    position: 'absolute',
    // top: 220,
    // left: 20,
    alignSelf: 'center',
  },
});

export default SquareScreen;
