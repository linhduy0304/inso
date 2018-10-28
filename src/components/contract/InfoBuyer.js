
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import CtLabel from './CtLabel';

const InfoBuyer = ({
    data,
}) => (
    <View>
      <CtLabel label='A. Người mua bảo hiểm'/>
      <View style={css.ctContent}>
        <Text style={css.name}>{data.fullname}</Text>
        <View style={css.ctItem}>
          <Text style={css.label}>Điện thoại</Text>
          <Text style={css.value}>{data.mobile}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Tỉnh/Thành phố</Text>
          <Text style={css.value}>{data.city_name}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Quận huyện/Thị xã</Text>
          <Text style={css.value}>{data.district_name}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Địa chỉ</Text>
          <Text style={css.value}>{data.address}</Text>
        </View>
      </View>
    </View>
);

const css = StyleSheet.create({
  ctItem: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'center',
  },
  label: {
    color: '#999',
    flex: 1,
  },
  value: {
    color: '#333',
    flex: 1
  },
  name: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16
  },
  ctContent:  {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5
  }
})

export default InfoBuyer;
