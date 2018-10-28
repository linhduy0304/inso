

import React, { Component } from 'react';
import { 
  View,
  Text, 
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground
} from 'react-native';
import Input from '../../../components/Input'
import Button from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { TxtBlack, screen, TxtGrey } from '../../../config/System';

const Css = require('../../../config/Css');

class CarRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      name: '',
      plates: '',
      uri: this.props.image
    };
  }

  componentWillMount = () => {
    const {registration} = this.props.carBuy.profile
    this.setState({
      profile: registration,
      name: registration.FULLNAME.value,
      plates: registration.NUMBER_PLATES.value,
    })
  };

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carBuy.profile.registration) {
      this.setState({
        uri: nextProps.carBuy.profile.registration.IMAGE.value
      })
    }
  }
  
  save() {
    var body = {
      function: 'InsoContractApi_updateContractProfile',
      params: {
        contract_id: this.props.contract_id,
        data: [
          {
            form_code: 'FORM_REGISTRATION_CERTIFICATE_CAR',
            fields: {
              IMAGE: this.state.uri,
              FULLNAME: this.state.name,
              NUMBER_PLATES: this.state.plates
            }
          }
        ]
      },
    }
    this.props.updateContract(body)
  }

  render() {
    const {profile, name, plates, uri} = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav title='Hoàn thành giấy đăng ký xe'/>
          <ScrollView>
            <View style={{flex: 1, padding: 20,paddingTop: 10}}>
              <View>
                <TouchableOpacity style={{width: screen.width-40, height: 200, alignItems: 'center', justifyContent: 'center'}} onPress={() => Actions.takePhotoAgain({action: 'FORM_REGISTRATION_CERTIFICATE_CAR'})}>
                  <Image style={{width: screen.width-40, height: 200}} source={{uri}}/>
                  <Image style={{position: 'absolute'}} source={require('../../../icons/ic_camera.png')}/>
                </TouchableOpacity>
                
                {
                  profile.IMAGE.reason ?
                    <Text style={{color: '#f97c7c', fontSize: 13}}>{profile.IMAGE.reason}</Text>
                  : null
                }
              </View>
              {
                profile ?
                <View>
                  <Input
                    label='Họ và tên'
                    value={name}
                    onChangeText={(name) => this.setState({name})}
                  />
                  {
                    profile.FULLNAME.reason ? 
                      <Text style={{color: '#f97c7c', fontSize: 13}}>{profile.FULLNAME.reason}</Text>
                    : null
                  }
                  <Input
                    label='Biển số xe'
                    value={plates}
                    onChangeText={(plates) => this.setState({plates})}
                  />
                  {
                    profile.NUMBER_PLATES.reason ?
                      <Text style={{color: '#f97c7c', fontSize: 13}}>{profile.NUMBER_PLATES.reason}</Text>
                    : null
                  }
                </View>
                : null
              }
            </View>
          </ScrollView>
          <FooterButton>
            <Button
              label='GỬI'
              marginTop={0}
              onPress={() => this.save()}
            />
          </FooterButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  value: {
    color: '#333'
  },
  ctItem: {
    flexDirection: 'row',
    marginTop: 15
  },
  label: {
    color: '#999999',
    width: 100
  },
  intro: {
    color: TxtBlack
  },
})

import {connect} from 'react-redux';
import { updateContract, getProfile} from '../../actions/buy';
import Nav from '../../../components/Nav';
import FooterButton from '../../../components/FooterButton';
import Loading from '../../../components/Loading';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (body) => dispatch(getProfile(body)),
    updateContract: (body) => dispatch(updateContract(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarRegistration);
