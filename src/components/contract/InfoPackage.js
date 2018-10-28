
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import CtLabel from './CtLabel';
import { screen,  } from '../../config/System';
import { renderVND} from '../../components/Functions';

const renderView = () => {
  var a = [];
  for(let i = 0; i < screen.width/5;i++ ) {
    a.push(
      <View key={i} style={{height: 1, width: 5,backgroundColor: '#bdbdbd', marginRight: 5}}></View>
    )
  }
  return a
}

const InfoPackage = ({
    data,
    discount_amount,
    total_fee
}) => (
    <View>
      <CtLabel label='C. Thông tin gói và phí bảo hiểm'/>
      {
        data.map((item, index) => {
          return (
            <View key={index} style={css.ctContent}>
              <Text style={css.name}>{index+1}. {item.name}</Text>
              {
                item.benefits.map((i, index1) => {
                  return (
                    <View key={index1} style={css.ctItem}>
                      <Text style={css.label}>{i.name}</Text>
                      <Text style={css.value}>{renderVND(i.fee)} đ</Text>
                    </View>
                  )
                })
              }
            </View>
          )
        })
      }
      
      <View style={css.ctBottom}>
        <View style={css.ctItem}>
          <Text style={css.label}>Số tiền tạm tính</Text>
          <Text style={css.value}>{renderVND(total_fee)} đ</Text>
        </View>
        <View style={css.ctItem}>
          <Text style={css.label}>Khuyến mãi</Text>
          <Text style={css.value}>{renderVND(discount_amount)} đ</Text>
        </View>
        <View style={{flexDirection: 'row',marginTop:5, marginBottom: 5, backgroundColor: '#ececec',}}>
          {renderView()}
        </View>
        <View style={css.ctItem}>
          <Text style={{color: '#000',fontWeight: 'bold',fontSize: 16, flex: 1}}>Số tiền thanh toán</Text>
          <Text style={{color: '#000'}}>{renderVND(total_fee - discount_amount)} đ</Text>
        </View>
      </View>
    </View>
);

const css = StyleSheet.create({
  ctBottom: {
    backgroundColor: '#ececec',
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
    marginBottom: 10
  },
  ctItem: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingBottom: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: '#333',
    flex: 1,
    marginRight: 10
  },
  value: {
    color: '#333',
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

export default InfoPackage;
