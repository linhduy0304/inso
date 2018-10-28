

import React from 'react';
import { Text, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {Color} from '../config/System'
const Input = ({
  label,
  value,
  editable=true,
  textColor = '#323643',
  tintColor = Color,
  baseColor = '#7c7c7c',
  keyboardType = 'default',
  onChangeText = text,
  secureTextEntry = false,
  width,
}) => (
  <TextField
    label={label}
    textColor= {textColor}
    tintColor= {tintColor}
    baseColor= {baseColor}
    value={value}
    editable={editable}
    secureTextEntry = {secureTextEntry}
    keyboardType = {keyboardType}
    onChangeText={ (text) => onChangeText(text) }
    style={{
      padding: 0,
      width,
    }}
  />
);

export default Input;
