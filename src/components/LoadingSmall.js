

import React from 'react';
import { Image, View } from 'react-native';
import { screen } from '../config/System';

const LoadingSmall = ({
    params,
}) => (
  <View style={{
    alignItems: 'center',
    justifyContent: 'center', 
    width: screen.width,
    padding: 20
  }}>
    <Image style={{width: 50, height: 50}} source={require('../icons/loading.gif')} />
  </View>
);

export default LoadingSmall;
