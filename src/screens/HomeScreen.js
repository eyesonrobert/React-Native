/** @format */

import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Easing,
  Modal,
  Pressable,
  Text,
  Platform,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Context } from '../context/ColorContext';
import Spacer from '../components/Spacer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Animated } from 'react-native';
import { AdMobBanner } from 'expo-ads-admob';
import { Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const halfWindowHeight = Dimensions.get('window').height / 2;

  const [modalVisible, setModalVisible] = useState(false);

  const [spinAnim, setSpinAnim] = useState(new Animated.Value(0));
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

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

  const bannerAdId =
    Platform.OS === 'ios'
      ? 'ca-app-pub-7813979423725088/8221020585'
      : 'ca-app-pub-7813979423725088/1597910095';

  const showAdd = Math.random() * 10;

  useEffect(() => {
    getPlayerColors();
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 5000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    const listener = navigation.addListener('didFocus', () => {
      getPlayerColors();
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
      <Animated.Image
        style={{
          transform: [{ rotate: spin }],
          height: halfWindowHeight,
          width: halfWindowHeight,
          alignSelf: 'center',
        }}
        source={require('../../assets/color-wheel.png')}
      />
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Each player choose a color</Text>
            <Text style={styles.modalText}>
              Tap your color faster than your opponent to win
            </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Okay, I'm ready to play</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Instructions</Text>
        </Pressable>
      {showAdd > 7 ? (
        <View style={styles.bottom}>
          <AdMobBanner
            bannerSize='fullBanner'
            adUnitID={bannerAdId}
            servePersonalizedAds={false}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    marginTop: 15,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 0
  }
});

export default HomeScreen;
