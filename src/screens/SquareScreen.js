/** @format */

import React, { useReducer, useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ColorCounter from '../components/ColorCounter';
import Spacer from '../components/Spacer';
import { Context } from '../context/ColorContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

const COLOR_INCREMENT = 15;
let lastPress = 0;

const reducer = (state, action) => {
  switch (action.type) {
    case 'change_red':
      return state.red + action.payload > 255 || state.red + action.payload < 0
        ? state
        : { ...state, red: state.red + action.payload };

    case 'change_green':
      return state.green + action.payload > 255 ||
        state.green + action.payload < 0
        ? state
        : { ...state, green: state.green + action.payload };

    case 'change_blue':
      return state.blue + action.payload > 255 ||
        state.blue + action.payload < 0
        ? state
        : { ...state, blue: state.blue + action.payload };

    case 'randomize':
      let random = randomRgb();

      return {
        ...state,
        red: random.red,
        green: random.green,
        blue: random.blue,
      };
    default:
      return state;
  }
};
const SquareScreen = ({ navigation }) => {
  const playerNumber = navigation.getParam('playerNumber');

  const { setPlayer1Color, setPlayer2Color } = useContext(Context);

  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const { red, green, blue } = state;

  const onDoublePress = () => {
    const time = new Date().getTime();
    const delta = time - lastPress;

    const DOUBLE_PRESS_DELAY = 400;
    if (delta < DOUBLE_PRESS_DELAY) {
      dispatch({ type: 'randomize' });
    }
    lastPress = time;
  };
  return (
    <View>
      <ColorCounter
        color='Red'
        onIncrease={() =>
          dispatch({ type: 'change_red', payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: 'change_red', payload: -1 * COLOR_INCREMENT })
        }
      />
      <ColorCounter
        color='Green'
        onIncrease={() =>
          dispatch({ type: 'change_green', payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: 'change_green', payload: -1 * COLOR_INCREMENT })
        }
      />
      <ColorCounter
        color='Blue'
        onIncrease={() =>
          dispatch({ type: 'change_blue', payload: COLOR_INCREMENT })
        }
        onDecrease={() =>
          dispatch({ type: 'change_blue', payload: -1 * COLOR_INCREMENT })
        }
      />
      <View>
        <TouchableOpacity
          style={{
            height: 300,
            width: 400,
            backgroundColor: `rgb(${red}, ${green}, ${blue})`,
            marginTop: 15,
          }}
          onPress={onDoublePress}
          activeOpacity={1}
        />
      </View>
      <Spacer>
        <Button
          title='Save'
          onPress={() => {
            if (playerNumber === 'Player 1') {
              setPlayer1Color(red, green, blue, () =>
                navigation.navigate('Home')
              );
            } else {
              setPlayer2Color(red, green, blue, () =>
                navigation.navigate('Home')
              );
            }
          }}
        />
      </Spacer>
    </View>
  );
};

const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  console.log(`rgb(${red}, ${green}, ${blue})`);
  return { red, green, blue };
};

const styles = StyleSheet.create({});

export default SquareScreen;
