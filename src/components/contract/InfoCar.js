
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import CtLabel from './CtLabel';
import { renderVND } from '../Functions';

const InfoCar = ({
    data,
}) => (
    <View>
      <CtLabel label='B. Thông tin xe'/>
      <View style={css.ctContent}>
        <View style={css.ctItem}>
          <Text style={css.label}>Hãng xe</Text>
          <Text style={css.value}>{data.vehicle_producer_name}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Dòng xe</Text>
          <Text style={css.value}>{data.vehicle_model_code}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Năm sản xuất</Text>
          <Text style={css.value}>{data.manufacture_year}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Biển số xe</Text>
          <Text style={css.value}>{data.number_plates}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Màu xe</Text>
          <Text style={css.value}>{data.color}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Chỗ ngồi</Text>
          <Text style={css.value}>{data.number_seats}</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Giá trị xe</Text>
          <Text style={css.value}>{renderVND(parseInt(data.insurance_amount))}đ</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Xe cá nhân không kinh doanh</Text>
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
  ctContent:  {
    padding: 20,
    paddingTop: 5,
    paddingBottom: 5
  }
})

export default InfoCar;
