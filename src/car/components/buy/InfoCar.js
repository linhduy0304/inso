
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { TxtBlack, screen } from '../../../config/System';
import Shadow from '../../../components/Shadow';

const InfoCar = ({
    data,
}) => (
    // <Shadow
    //   height={200}
    //   width={screen.width-40}
    //   x={0}
    //   y={0}
    // >
      <View style={css.ct}>
        <Text style={[css.intro, {fontWeight: 'bold'}]}>Thông tin xe đã đăng ký</Text>
        <View style={css.ctItem}>
          <Text style={css.title}>Hãng xe</Text>
          <Text numberOfLines={1} style={css.value}>{data.name}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.title}>Dòng xe</Text>
          <Text numberOfLines={1} style={css.value}>{data.model}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.title}>Năm sản xuất</Text>
          <Text style={css.value}>{data.year}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.title}>Số chỗ ngồi</Text>
          <Text style={css.value}>{data.seat}</Text>
        </View>
      </View>
    // </Shadow>
    
);

const css = StyleSheet.create({
  intro: {
    color: TxtBlack,
    marginBottom: 10,
    fontSize: 16,
  },
  value: {
    color: TxtBlack,
    flex: 1,
  },
  title: {
    color: TxtBlack,
    flex: 2
  },
  ctItem: {
    flexDirection: 'row',
    paddingTop: 7,
    paddingBottom: 7
  },
  ct: {
    backgroundColor: '#fff',
    height: 200,
    width:screen.width-40,
    padding: 30,
    paddingTop: 20
  }
})

export default InfoCar;
