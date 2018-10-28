
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { screen } from '../../../config/System';

const ItemExclusion = ({
    data,
}) => (
    <View style={css.ct}>
       <View style={css.ctImage}>
          <Image style={{height: (screen.width-60)*4/3, width: screen.width-60, borderRadius: 5}} source={{uri: data.image}}/>
        </View>
        <Text style={css.txt}>{data.description}</Text>
    </View>
);
const css = StyleSheet.create({
  ct: {
    marginTop: 20
  },
  txt: {
    color: '#333',
    marginTop: 5,
  },
  ctImage: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 7
  },
})
export default ItemExclusion;
