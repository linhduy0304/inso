
import React from 'react';
import { Text, View } from 'react-native';
import Shadow from './Shadow';
import { screen } from '../config/System';

const FooterButton = ({
    children,
}) => (
    <Shadow
      height={65}
      width={screen.width}
      x={0}
      y={0}
    >
      <View style={{alignItems: 'center',height: 65, justifyContent: 'center', backgroundColor: '#fff',}}>
        {children}
      </View>
    </Shadow>
   
);

export default FooterButton;
