
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
    case 'CAR':
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

const onPress = (data) => {
  switch(data.code) {
    case "CAR":
      Actions.carClaimPick({claim_type_id: data.id});
      return;
    default: 
      return;
  }
}

const ItemClaim = ({
    data,
}) => (
    <View style={{marginTop: 10}}>
      <TouchableOpacity onPress={() => onPress(data)} style={css.ct}>
        <Gradient>
          <View style={css.ctIcon}>
            <Image style={css.icon} source={renderImage(data.code)} />
          </View>
        </Gradient>
        <View style={{flex: 1, marginLeft: 10}}>
            <Text style={{color: '#999', fontSize: 13}}>Bồi thường bảo hiểm</Text>
            <Text style={{color: '#000', fontSize: 15}}>{data.name}</Text>
        </View>
        <Image style={{height: 15, width: 15*24/39}} source={require('../../icons/ic_arrow_right_grey.png')}/>
      </TouchableOpacity>
    </View>
);

const css = StyleSheet.create({
  icRight: {
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
    paddingHorizontal: 15,
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


export default (ItemClaim);
