
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { screen } from '../../../config/System';
import Gradient from '../../../components/Gradient';
import { Actions } from 'react-native-router-flux';

class ItemRequirement extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount = () => {
    var body = {
      "function": "InsoContractApi_getFormProfileData",
      "params": {
        "contract_id": this.props.contract_id,
        "form_code": this.props.data.code
      },
    }
    console.log(body)
    this.props.getFormProfileData(body)
  };

  renderImage = (type) => {
    switch(type) {
      case 'FORM_DRIVER_LICENSE':
        return <Image style={{ width: 25, resizeMode: 'contain'}} source={require('../../../icons/ic_registration_2.png')}/>;
      case 'FORM_IMAGE_SCENE':
        return <Image style={css.icon} source={require('../../../icons/ic_oto_3.png')}/>;
      case 'FORM_IMAGE_CAR':
        return <Image style={css.icon} source={require('../../../icons/ic_oto_2.png')}/>;
      case 'FORM_IMAGE_DAMAGE':
        return <Image style={{ width: 20, resizeMode: 'contain'}} source={require('../../../icons/ic_scan.png')}/>;
      default:
        return;
    }
  }

    onPress = (data) => {
        switch(data.code) {
            case 'FORM_IMAGE_CAR':
                Actions.carClaimCorner();
                return;
            default:
                return;
        } 
    }

  render() {
    const {data} = this.props;
    return (
        <View style={{marginTop: 10}}>
            <TouchableOpacity onPress={() => this.onPress(data)} style={css.ct}>
            <Gradient>
                <View style={css.ctIcon}>
                  {this.renderImage(data.code)}
                </View>
            </Gradient>
            <View style={{flex: 1, marginLeft: 10}}>
                <Text style={{color: '#999', fontSize: 13}}>Bồi thường bảo hiểm</Text>
                <Text style={{color: '#000', fontSize: 15}}>{data.name}</Text>
            </View>
            <Image style={{height: 15, width: 15*24/39}} source={require('../../../icons/ic_arrow_right_grey.png')}/>
            </TouchableOpacity>
        </View>
    );
  }
}

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

import {connect} from 'react-redux';
import {getFormProfileData} from '../../actions/claim';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getFormProfileData: (body) => dispatch(getFormProfileData(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemRequirement);
