
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { screen } from '../../config/System';
import { Actions } from 'react-native-router-flux';
import { renderVND } from '../Functions';
const height = 25;

const Header = ({
  payment_amount,
}) => (
    <View>
      <LinearGradient
        start={{x: 0.0, y: 0.0}} 
        end={{x: 1.0, y: 1.0}}
        style={{
        }}
        colors={['#0bc5b8','#1ed29f','#1dd1a1','#2bda8f']} >
        <View style={css.ctNav}>
          <Text style={css.title}>Thanh toán</Text>
          <TouchableOpacity onPress={() => Actions.pop()} style={css.ctBack}>
            <Image style={css.icBack} source={require('../../icons/ic_back.png')}/>
          </TouchableOpacity>
        </View>
        <View style={css.content}>
          <Text style={{color: '#fff'}}>SỐ TIỀN THANH TOÁN</Text>
          <Text style={{color: '#fff',fontSize: 25, fontWeight: 'bold'}}>{renderVND(payment_amount)}đ</Text>
        </View>
      </LinearGradient>
    </View>
);

const css = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    maxWidth: screen.width/2,
  },
  ctBack: {
    padding: 20,
    position: 'absolute',
    left: 0
  },
  icBack: {
    height: 20,
    width: 20*21/39
  },
  ctNav: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default Header;
