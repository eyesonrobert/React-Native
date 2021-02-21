/** @format */

import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import Spacer from '../components/Spacer';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Well Hello There</Text>
      <Spacer>
        <Button
          title='Play Game'
          onPress={() => navigation.navigate('Counter')}
        />
      </Spacer>
      <Spacer>
        <Button
          title='Go to Color Demo'
          onPress={() => navigation.navigate('Color')}
        />
      </Spacer>
      <Spacer>
        <Button
          title='Set Player 1 Custom Color'
          onPress={() => navigation.navigate('Square', { playerNumber: "Player 1" })}
        />
      </Spacer>
      <Spacer>
        <Button
          title='Set Player 2 Customer Color'
          onPress={() => navigation.navigate('Square', { playerNumber: "Player 2" })}
        />
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
