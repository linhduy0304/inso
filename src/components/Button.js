

import React from 'react';
import { 
  Text, 
  View ,
  TouchableOpacity,
} from 'react-native';
import {Color, screen} from '../config/System'
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  label,
  onPress,
  borderRadius = 6,
  width = screen.width-40,
  // backgroundColor = Color,
  height = 45,
  color = '#fff',
  fontWeight = 'bold',
  marginTop = 20,
  disabled=false
}) => (
  <LinearGradient 
    start={{x: 0.0, y: 0.0}} 
    end={{x: 0.5, y: 1.0}}
    style={{
      borderRadius,
      height,
      width,
      marginTop,
    }}
    colors={['#0bc5b8', '#10c8b1', '#15cbac', '#17cda8', '#1fd29f', '#25d697', '#2bda90']} >
    <TouchableOpacity
      disabled={disabled}
      style={{
        borderRadius,
        height,
        width,
        alignItems: 'center',
        justifyContent: 'center',
      }} 
      onPress={onPress} >
      <Text style={{
        color,
        fontSize:16,
        fontWeight
      }}>{label}</Text>
    </TouchableOpacity>
  </LinearGradient>
    
);

export default Button;
