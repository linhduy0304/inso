
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import Shadow from '../Shadow';
import { screen } from '../../config/System';
import Gradient from '../Gradient';
import { Actions } from 'react-native-router-flux';

const renderImage = (type) => {
  switch(type) {
    case 'INSO_CAR':
      return require('../../icons/ic_oto_2.png');
    case 'INSO_AIRLINE':
      return require('../../icons/ic_plane_white.png');
    case 'INSO_HEALTH':
      return require('../../icons/ic_health_white.png');
    case 'INSO_LOVE':
      return require('../../icons/ic_love_white.png');
    case 'INSO_HOUSE':
      return require('../../icons/ic_house_white.png');
    default:
      return;
  }
}

const renderName = (type) => {
  switch(type) {
    case 'oto':
      return 'Mua bảo hiểm ô tô';
  }
}

const onPress = (data) => {
  switch(data.screen) {
    case "CONTRACT_DETAIL":
      Actions.contractInfo({contract_id: data.id, load: 'CONTRACT_DETAIL'});
      return;
    case "CONTRACT_UPDATE_DATA":
      Actions.carRequirement({contract_id: data.id});
      return;
    case "CONTRACT_PAYMENT":
      Actions.contractInfo({contract_id: data.id, load: 'CONTRACT_PAYMENT', payment_amount: data.payment_amount});
      return;
    case "CONTRACT_CONFIRM_EXCLUSION":
      Actions.carExclusion({contract_id: data.id})
      return;
    case 'CONTRACT_CONFIRM_INSURANCE_AMOUNT':
      Actions.carPriceExclusion({contract_id: data.id, payment_amount: data.payment_amount, insurance_amount: data.insurance_amount})
      return;
    default: 
      return;
  }
}

const ItemBuy = ({
    data,
}) => (
    <View style={{marginTop: 10}}>
      {/* <Shadow
        height={74}
        width={screen.width-40}
        x={1}
        y={0}
      > */}
        <TouchableOpacity onPress={() => onPress(data)} style={css.ct}>
          <Gradient>
           <View style={css.ctIcon}>
             <Image style={css.icon} source={renderImage(data.category_code)} />
           </View>
          </Gradient>
          <View style={{flex: 1, marginLeft: 10}}>
             <Text style={{color: '#000'}}>{data.name}</Text>
             <Text style={{color: data.accept ? '#30cecb' : '#f97c7c', marginTop: 5, fontSize: 12}}>{data.status}</Text>
             {/* {
                data.status == 1 ?
                  <Text style={{color: '#30cecb', marginTop: 5, fontSize: 12}}>Đã hoàn thành</Text>
                : 
                 <Text style={{color: '#f97c7c', marginTop: 5, fontSize: 12}}>Đang được xử lý</Text>
             } */}
          </View>
          {/* <Image style={css.icPosition} source={require('../../icons/ic_oto_position.png')}/> */}
        </TouchableOpacity>
      {/* </Shadow> */}
    </View>
);

const css = StyleSheet.create({
  icPosition: {
    position: 'absolute',
    right: 0,
    height: 70,
    width: 70*77/138
  },
  icon: {
    width: 35,
    resizeMode: 'contain'
  },
  ct: {
    flexDirection: 'row',
    width: screen.width-43,
    backgroundColor: '#fff',
    height: 70,
    paddingLeft: 15,
    marginLeft: 2,
    alignItems: 'center',
    borderRadius: 5
  },
  ctIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ItemBuy;
