

import React from 'react';
import { Text, View } from 'react-native';
import {screen} from '../config/System';
import {BoxShadow} from 'react-native-shadow';

const Shadow = ({
    children,
    height,
    width,
    x=8,
    y=-8,
}) => (
  <BoxShadow setting={{
    width,
    height,
    color:"#999",
    border:7,
    radius:5,
    opacity:0.1,
    x,
    y,
    // style:{marginVertical:5}
  }}>
    {children}
  </BoxShadow>
);

export default Shadow;
