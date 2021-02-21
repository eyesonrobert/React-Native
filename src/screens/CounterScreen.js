/** @format */

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Context } from '../context/ColorContext';

const CounterScreen = ({ navigation }) => {
  const [counter, setCounter] = useState(0);
  const [topHeight, setTopHeight] = useState(320);
  const [bottomHeight, setBottomHeight] = useState(320);
  const { state, getPlayerColors } = useContext(Context);

  let player1Color = 'steelblue';
  if (state?.player1) {
    if (state.player1.red + state.player1.green + state.player1.blue) {
      player1Color = `rgb(${state.player1.red}, ${state.player1.green}, ${state.player1.blue})`;
    }
  }

  let player2Color = 'powderblue';
  if (state?.player2) {
    if (state.player2.red + state.player2.green + state.player2.blue) {
      player2Color = `rgb(${state.player2.red}, ${state.player2.green}, ${state.player2.blue})`;
    }
  }

  useEffect(() => {
    getPlayerColors();

    const listener = navigation.addListener('didFocus', () => {
      getPlayerColors();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: player2Color }}>
      <View style={{ backgroundColor: player1Color }}>
        <TouchableOpacity
          style={{ height: topHeight, backgroundColor: player1Color }}
          onPress={() => {
            setCounter(counter + 1);
            setTopHeight(topHeight + 75);
          }}
          disabled={counter === -5 || counter === 5}
        />
      </View>
      <TouchableOpacity
        style={{
          height: bottomHeight,
          backgroundColor: player2Color,
          flex: 1,
        }}
        onPress={() => {
          setCounter(counter - 1);
          setTopHeight(topHeight - 75);
        }}
        disabled={counter === -5 || counter === 5}
      />
      {counter === -5 || counter === 5 ? gameOver(counter) : null}
      <Text>{counter}</Text>
    </View>
  );
};

const gameOver = (counter) => {
  let winner = 'Player 1';
  let loser = 'Player 1';

  if (counter === 15) {
    winner = 'Player 1';
    loser = 'Player 2';
  } else {
    winner = 'Player 2';
    loser = 'Player 1';
  }

  Alert.alert(
    `${winner} Wins`,
    `Better luck next time, ${loser}`,
    [
      {
        text: 'Ok',
        style: 'cancel',
      },
    ],
    { cancelable: false }
  );
};

const styles = StyleSheet.create({});

export default CounterScreen;