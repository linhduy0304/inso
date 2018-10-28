

import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {screen, TxtBlack, ColorLoginNow, TxtGrey} from '../../../config/System';
import Shadow from '../../../components/Shadow';
import { Actions } from 'react-native-router-flux';
import Gradient from '../../../components/Gradient';

class ItemRequirement extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentWillMount = () => {
    var body = {
      "function": "InsoContractApi_getFormProfileData",
      "params": {
        "contract_id": this.props.contract_id,
        "form_code": this.props.data.code
      },
    }
    this.props.getProfile(body)
  };

  onPress = (data, contract_id) => {
    switch(data.code) {
      case 'FORM_IMAGE_CAR':
        Actions.carCorner({contract_id: contract_id, form_code: data.code})
        return;
      case 'FORM_REGISTRATION_CERTIFICATE_CAR':
        // if(data.validate) {
        //   Actions.carRegistration({contract_id: contract_id,});
        //   return
        // }
        if(this.props.carBuy.profile.registration.IMAGE.value == '') {
          Actions.takePhoto({action: 'FORM_REGISTRATION_CERTIFICATE_CAR', contract_id})
        }else {
          Actions.carRegistration({image: this.props.carBuy.profile.registration.IMAGE.value, contract_id})
        }
        // Actions.carRegistration({contract_id: contract_id, form_code: data.code})
        return;
      case 'FORM_CERTIFICATE_CAR':
        if(this.props.carBuy.profile.certificate.IMAGE.value == '') {
          Actions.takePhoto({action: 'FORM_CERTIFICATE_CAR', contract_id})
        }else {
          Actions.carCertificate({image: this.props.carBuy.profile.certificate.IMAGE.value, contract_id})
        }
        
        // Actions.carCertificate({contract_id: contract_id, form_code: data.code})
        return;
      default: 
        return;
    }
  }

  renderImage = (code) => {
    switch(code) {
      case 'FORM_REGISTRATION_CERTIFICATE_CAR':
        return require('../../../icons/ic_registration.png');
      case 'FORM_IMAGE_CAR':
        return require('../../../icons/ic_oto_1.png');
      case 'FORM_CERTIFICATE_CAR':
        return require('../../../icons/ic_dkiem.png');
      default:
        return;
    }
  }

  render() {
    const {data, contract_id} = this.props;
    return (
    <View style={{marginTop: 10}}>
      {/* <Shadow
        height={70}
        width={screen.width -40}
        x={0}
        y={10}
      > */}
        <TouchableOpacity onPress={() => this.onPress(data, contract_id)} style={css.ct}>
          <Gradient>
           <View style={css.ctIcon}>
             <Image style={css.icon} source={this.renderImage(data.code)} />
           </View>
          </Gradient>
          <View style={{marginLeft: 10, flex: 1}}>
            <Text style={css.name}>{data.name}</Text>
            {
              data.validate ?
              <Text style={{color: '#30cecb', fontSize: 12}}>Đã hoàn thành</Text>
              :
              <Text style={{color: '#f97c7c', fontSize: 12}}>Chưa hoàn thiện</Text>
            }
          </View>
          <Image style={{height: 15, width: 15*24/39}} source={require('../../../icons/ic_arrow_right_grey.png')}/>
        </TouchableOpacity>
      {/* </Shadow> */}
    </View>
    )
  }
}

const css = StyleSheet.create({
  name: {
    color: '#333'
  },
  icon: {
    height: 20,
    resizeMode: 'contain'
  },
  ctIcon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ct: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 70,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
    borderRadius: 5
  },
})

import {connect} from 'react-redux';
import {getProfile} from '../../actions/buy';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (body) => dispatch(getProfile(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemRequirement);
