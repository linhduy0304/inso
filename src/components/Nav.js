

import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StBarIos from './StBarIos';
import { Color, screen } from '../config/System';
import { Actions } from 'react-native-router-flux';
const Nav = ({
    title,
    show = true,
    onPress = () =>  Actions.pop()
}) => (
    <View >
      <StatusBar
        backgroundColor={Color}
        barStyle='light-content'
      />
      {
        Platform.OS === 'ios' ?
          <StBarIos backgroundColor={Color}/>
          : null
      }
      <LinearGradient
        start={{x: 0.0, y: 0.0}} 
        end={{x: 1.0, y: 1.0}}
        style={{
        }}
        colors={['#0bc5b8','#1ed29f','#1dd1a1','#2bda8f']} >
        <View style={css.ctNav}>
          <Text style={css.title}>{title}</Text>
          {
            show ? 
            <TouchableOpacity onPress={onPress} style={css.ctBack}>
              <Image style={css.icBack} source={require('../icons/ic_back.png')}/>
            </TouchableOpacity>
            : null
          }
          <TouchableOpacity style={css.ctInfo}>
            <Image style={css.icInfo} source={require('../icons/ic_info.png')}/>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
);

const css = StyleSheet.create({
  ctInfo: {
    padding: 15,
    position: 'absolute',
    right: 0
  },
  ctBack: {
    padding: 15,
    position: 'absolute',
    left: 0
  },
  icBack: {
    height: 20,
    width: 20*21/39
  },
  icInfo: {
    height: 20,
    width: 20
  },
  ctNav: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    maxWidth: screen.width-100,
  },
})

export default Nav;
