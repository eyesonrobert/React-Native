/** @format */

import React, { useReducer, useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import ColorCounter from '../components/ColorCounter';
import Spacer from '../components/Spacer';
import { Context } from '../context/ColorContext';

const COLOR_INCREMENT = 15;

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
    default:
      return state;
  }
};
const SquareScreen = ({ navigation }) => {
  const playerNumber = navigation.getParam('playerNumber');

  const { setPlayer1Color, setPlayer2Color } = useContext(Context);

  const [state, dispatch] = useReducer(reducer, { red: 0, green: 0, blue: 0 });
  const { red, green, blue } = state;
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
      <View
        style={{
          height: 300,
          width: 400,
          backgroundColor: `rgb(${red}, ${green}, ${blue})`,
          marginTop: 15,
        }}
      />
      <Spacer>
        <Button
          title='Save'
          onPress={() => {
            if(playerNumber === 'Player 1'){
              setPlayer1Color(red, green, blue, () =>
                navigation.navigate('Home')
              );
            } else{
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

const styles = StyleSheet.create({});

export default SquareScreen;
