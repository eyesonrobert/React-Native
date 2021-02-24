/** @format */

import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

const HomeScreen = ({ navigation }) => {
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
          title='Set Player 1 Color'
          onPress={() =>
            navigation.navigate('Square', { playerNumber: 'Player 1' })
          }
        />
      </Spacer>
      <Spacer>
        <Button
          title='Set Player 2 Color'
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
    top: 110,
    transform: [{ rotate: '90deg' }],
  },
});

export default HomeScreen;
