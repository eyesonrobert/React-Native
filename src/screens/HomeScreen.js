/** @format */

import React, { useContext, useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Context } from '../context/ColorContext';
import Spacer from '../components/Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';

const HomeScreen = ({ navigation }) => {
  const { state, getPlayerColors } = useContext(Context);

  let player1Color = null;
  if (state?.player1) {
    if (state.player1.red + state.player1.green + state.player1.blue) {
      player1Color = `rgb(${state.player1.red}, ${state.player1.green}, ${state.player1.blue})`;
    }
  }

  let player2Color = null;
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
    <View style={{ backgroundColor: 'white' }}>
      <Spacer>
        <Button
          activeOpacity={1}
          title='Play Game'
          type='clear'
          onPress={() => navigation.navigate('Counter')}
          buttonStyle={{
            backgroundColor: 'black',
            borderRadius: 60,
            alignSelf: 'center',
            height: 50,
            width: 300,
          }}
        />
      </Spacer>
      <Spacer>
        <Button
          title='Set Player 1 Color '
          iconRight
          icon={
            <Icon
              style={{ paddingLeft: 10 }}
              name='square'
              size={20}
              color={player1Color}
            />
          }
          onPress={() =>
            navigation.navigate('Square', { playerNumber: 'Player 1' })
          }
        />
      </Spacer>
      <Spacer>
        <Button
          title='Set Player 2 Color'
          iconRight
          icon={
            <Icon
              style={{ paddingLeft: 10 }}
              name='square'
              size={20}
              color={player2Color}
            />
          }
          onPress={() =>
            navigation.navigate('Square', { playerNumber: 'Player 2' })
          }
        />
      </Spacer>
      <Image
        style={styles.paint}
        source={require('../../assets/paint_brushes.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paint: {
    height: 400,
    width: 400,
    top: 80,
    transform: [{ rotate: '90deg' }],
  },
});

export default HomeScreen;
