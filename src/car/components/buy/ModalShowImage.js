
import React from 'react';
import { Text, View, Image } from 'react-native';
import ModalBox from 'react-native-modalbox';
import Button from '../../../components/Button';
import ButtonNotColor from '../../../components/ButtonNoColor';
import { screen, TxtBlack } from '../../../config/System';
import { Actions } from 'react-native-router-flux';

const ModalShowImage = ({
  onClosed,
  open,
  image,
  type
}) => (
  <ModalBox
    isOpen={open}
    entry={'top'}
    onClosed={onClosed}
    style={{backgroundColor: 'ababab', width: screen.width-40, justifyContent: 'center'}}
  >
    <View style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',paddingBottom: 20}}>
      <Image style={{height: screen.width-40, width: screen.width-40}} source={{uri: image.uri}} />
      <Button 
        label='CHỤP LẠI ẢNH'
        width={screen.width/2}
        marginTop={20}
        onPress={() => {
          onClosed();
          if(type === 'claim') {
            Actions.carClaimCameraAgain({active: image.active, action: 'FORM_IMAGE_CAR'})
          }else {
            Actions.takePhotoAgain({active: image.active, action: 'FORM_IMAGE_CAR'})
          }
        }}
        borderRadius={20}
      />
    </View>
  </ModalBox>
);

export default ModalShowImage;
