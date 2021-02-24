/** @format */

import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
} from 'react-native';
import { Context } from '../context/ColorContext';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Dimensions } from 'react-native';

const CounterScreen = ({ navigation }) => {
  const halfWindowHeight = Dimensions.get('window').height * 0.5;
  const INCREMENT = halfWindowHeight/4.5;

  const [counter, setCounter] = useState(0);
  const [topHeight, setTopHeight] = useState(halfWindowHeight + 20);
  const [bottomHeight, setBottomHeight] = useState(halfWindowHeight);
  const [showCountDown, setShowCountdown] = useState(true);

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

  refresh = () => {
    setCounter(0);
    setTopHeight(halfWindowHeight);
    setBottomHeight(halfWindowHeight);
    setShowCountdown(true);
  };

  goHome = () => {
    navigation.navigate('Home');
  };

  const reRunCountDown = () => {
    setShowCountdown(false);
    return 0;
  };

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
      <View
        style={{
          backgroundColor: player1Color,
          // borderColor: 'white',
          // borderWidth: 5,
        }}>
        <TouchableOpacity
          style={{ height: topHeight, backgroundColor: player1Color }}
          onPress={() => {
            setCounter(counter + 1);
            setTopHeight(topHeight + INCREMENT);
          }}
          disabled={counter === -5 || counter === 5 || showCountDown}
        />
      </View>
      {showCountDown ? (
        <View
          style={{
            zIndex: 2,
            position: 'absolute',
            top: halfWindowHeight - 100,
            left: 100,
          }}>
          <CountdownCircleTimer
            onComplete={() => {
              return [false, reRunCountDown()];
            }}
            isPlaying
            duration={3}
            colors={[
              ['#004777', 1.0],
              ['#F7B801', 0.4],
              ['#A30000', 0.2],
            ]}>
            {({ remainingTime, animatedColor }) => {
              return (
                <Animated.Text style={{ fontSize: 46, color: animatedColor }}>
                  {remainingTime}
                </Animated.Text>
              );
            }}
          </CountdownCircleTimer>
        </View>
      ) : null}
      <TouchableOpacity
        activeOpacity={1}
        style={{
          height: bottomHeight,
          // backgroundColor: player2Color,
          flex: 1,
          // borderColor: 'purple',
          // borderWidth: 5,
        }}
        onPress={() => {
          setCounter(counter - 1);
          setTopHeight(topHeight - INCREMENT);
        }}
        disabled={counter === -5 || counter === 5 || showCountDown}
      />
      {counter === -5 || counter === 5 ? gameOver(counter) : null}
    </View>
  );
};

const gameOver = (counter) => {
  let winner = 'Player 1';
  let loser = 'Player 1';

  if (counter === 5) {
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
        text: 'Back to Home',
        onPress: () => {
          goHome();
        },
      },
      {
        text: '',
      },
      {
        text: 'Replay',
        style: 'cancel',
        onPress: () => {
          refresh();
        },
      },
    ],
    { cancelable: false }
  );
};

CounterScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

const styles = StyleSheet.create({});

export default CounterScreen;
