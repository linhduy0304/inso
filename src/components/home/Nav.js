

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
import StBarIos from '../StBarIos';
import { Color, screen } from '../../config/System';
import { Actions } from 'react-native-router-flux';
const Nav = ({
    open
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
      <View style={css.ctNav}>
        <Image style={css.logo} source={require('../../icons/logo_home.png')}/>
        <TouchableOpacity onPress={open} style={css.ctBack}>
          <Image style={css.icBack} source={require('../../icons/ic_menu.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Actions.notify()} style={css.ctInfo}>
          <Image style={css.icInfo} source={require('../../icons/ic_noti.png')}/>
        </TouchableOpacity>
      </View>
    </View>
);

const css = StyleSheet.create({
  logo: {
    height: 25,
    width: 25*127/55
  },
  ctInfo: {
    padding: 20,
    position: 'absolute',
    right: 0
  },
  ctBack: {
    padding: 20,
    position: 'absolute',
    left: 0
  },
  icBack: {
    height: 20,
    width: 20*37/31
  },
  icInfo: {
    height: 20,
    width: 20*34/43
  },
  ctNav: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    maxWidth: screen.width/2,
  },
})

export default Nav;
