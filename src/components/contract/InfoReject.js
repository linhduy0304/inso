
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import CtLabel from './CtLabel';
import Shadow from '../Shadow';
import { screen } from '../../config/System';
import ItemExclusion from '../../car/components/buy/ItemExclusion';

const InfoReject = ({
    data,
}) => (
    <View>
      <CtLabel label='D. Điểm loại trừ'/>
      <View style={css.ctContent}>
        {
          data.map((item, index) => {
            return <ItemExclusion data={item} key={index}/>
          })
        }
      </View>
    </View>
);

const css = StyleSheet.create({
  ctImage: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    borderRadius: 7
  },
  ctContent:  {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5
  }
})

export default InfoReject;
