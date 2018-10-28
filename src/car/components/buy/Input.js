

import React from 'react';
import { Image, View } from 'react-native';
import { TextField } from 'react-native-material-textfield';
import {Color} from '../../../config/System';

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
  <View style={{justifyContent: 'center'}}>
    <Image style={{position: 'absolute',right: 15, width: 10, height: 10*9/17}} source={require('../../../icons/ic_down.png')}/>
    <TextField
      label={label}
      textColor= {textColor}
      tintColor= {tintColor}
      baseColor= {baseColor}
      value={value}
      activeLineWidth={0.5}
      editable={editable}
      secureTextEntry = {secureTextEntry}
      keyboardType = {keyboardType}
      onChangeText={ (text) => onChangeText(text) }
      style={{
        padding: 0,
        paddingRight: 50,
        width,
      }}
    />
  </View>
);

export default Input;
