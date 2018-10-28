
import React from 'react';
import {
  TouchableOpacity,
  Image
} from 'react-native';
import { TextField } from 'react-native-material-textfield';
import { screen, Color } from '../../../config/System';

const InputYear = ({
  openModal,
  keyword,
  producer
}) => (
  <TouchableOpacity disabled={producer ? false : true} onPress={openModal} style={{justifyContent: 'center'}}>
    <Image style={{position: 'absolute',right: 15, width: 10, height: 10*9/17}} source={require('../../../icons/ic_down.png')}/>
    <TextField
      label={'Năm sản xuất'}
      textColor= {'#323643'}
      tintColor= {Color}
      baseColor= {'#7c7c7c'}
      value={keyword}
      activeLineWidth={0.5}
      editable={false}
      style={{
        padding: 0,
        paddingRight: 50,
      }}
    />
  </TouchableOpacity>
);

export default InputYear;
