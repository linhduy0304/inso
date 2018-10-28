



import React from 'react';
import { 
  Text, 
  View ,
  TouchableOpacity,
} from 'react-native';
import {screen, TxtGrey} from '../config/System'

const ButtonNotColor = ({
  label,
  onPress,
  borderRadius = 5,
  width = screen.width-40,
  backgroundColor = '#fff',
  height = 45,
  borderColor='#0cc6b6',
  borderWidth= 0,
  color = TxtGrey,
  fontWeight = 'bold',
  marginTop = 15,
  fontSize = 13,
  disabled=false
}) => (
    <TouchableOpacity
      disabled={disabled}
      style={{
        borderRadius,
        height,
        marginTop,
        borderWidth,
        borderColor,
        width,
        backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }} 
      onPress={onPress} >
      <Text style={{
        color,
        fontWeight,
        fontSize
      }}>{label}</Text>
    </TouchableOpacity>
    
);

export default ButtonNotColor;
