

import React from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Gradient = ({
    children,
    borderRadius= 25,
    colors=['#0bc5b8', '#10c8b1', '#15cbac', '#17cda8', '#1fd29f', '#25d697', '#2bda90']
}) => (
  <LinearGradient 
  start={{x: 0.0, y: 0.0}} 
  end={{x: 1.0, y: 0.0}}
  style={{
    borderRadius
  }}
  colors={colors}
  >
  {
    children
  }
  </LinearGradient>
);

export default Gradient;
