
import React from 'react';
import { Text, View, Image } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from './Button'
import ButtonNoColor from './ButtonNoColor'
import { screen, TxtBlack } from '../config/System';

const ModalNoti = ({
  onClosed,
  open,
  text,
  onPress,
  label='ĐỒNG Ý'
}) => (
  <Modal
    isOpen={open}
    entry={'top'}
    onClosed={onClosed}
    style={{backgroundColor: 'ababab', width: screen.width-80, justifyContent: 'center' }}
    >
    <View style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingBottom: 20}}>
      <Image style={{height: 200, width: 200}} source={require('../icons/ic_notification.png')} />
      <Text style={{color: TxtBlack, fontSize: 16}}>Thông báo</Text>
      <Text style={{textAlign: 'center',lineHeight: 20, marginLeft: 30, marginRight: 30, color: '#333', marginTop:5}}>{text}</Text>
      {/* <Text style={{color: '#30cecb', fontWeight: 'bold'}}> đ</Text> */}
      <Button 
        label={label}
        width={screen.width/2}
        marginTop={20}
        borderRadius={20}
        onPress={onPress}
      />
      {/* <ButtonNoColor
        label='KHÔNG ĐỒNG Ý'
        backgroundColor={'#ccc'}
        width={screen.width/2}
        borderRadius={20}
        color='#fff'
        onPress = {() => Actions.tab({type: 'reset'})}
      /> */}
    </View>
  </Modal>
);

export default ModalNoti;
