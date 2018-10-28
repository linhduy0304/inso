
import React from 'react';
import { Text, View, Image } from 'react-native';
import ModalBox from 'react-native-modalbox';
import Button from '../../components/Button';
import ButtonNotColor from '../../components/ButtonNoColor';
import { screen, TxtBlack } from '../../config/System';

const Modal = ({
  onClosed,
  open,
  content,
  cancel,
  onPressSubmit,
  onPressCancel
}) => (
  <ModalBox
    isOpen={open}
    entry={'top'}
    // onClosed={onClosed}
    style={{backgroundColor: 'ababab', width: screen.width-80, justifyContent: 'center' }}
  >
    <View style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', borderRadius: 10, paddingBottom: 20}}>
      <Image style={{height: 200, width: 200}} source={require('../../icons/ic_modal.png')} />
      <Text style={{color: TxtBlack, fontSize: 16}}>Thông báo</Text>
      <Text style={{textAlign: 'center',lineHeight: 20, marginLeft: 30, marginRight: 30, color: '#333', marginTop:5}}>{content}</Text>
      <Button 
        label='ĐỒNG Ý'
        width={screen.width/2}
        marginTop={20}
        onPress={onPressSubmit}
        borderRadius={20}
      />
      <ButtonNotColor
        label={cancel}
        onPress={onPressCancel}
        backgroundColor={'#ccc'}
        width={screen.width/2}
        borderRadius={20}
        color='#fff'
      />
    </View>
  </ModalBox>
);

export default Modal;
