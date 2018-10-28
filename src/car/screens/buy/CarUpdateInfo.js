

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Keyboard
} from 'react-native';
import Css from '../../../config/Css';
import Button from '../../../components/Button';

class CarUpdateInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bks: '',
      mobile: '',
    };
  }

  next = () => {
    const {name, bks, mobile} = this.state;
    Keyboard.dismiss();
    if(!name || !bks || !mobile) {
      SimpleToast.show('Bạn vui lòng nhập đầy đủ thông tin')
      return;
    }
    var body = {
      function: 'InsoContractApi_updateCustomerAndTargetInfo',
      params: {
        contract_id: this.props.contract_id,
        customer_fullname: this.state.name,
        number_plates: this.state.bks,
        mobile,
      },
    }
    this.props.updateInfo(body)
  }

  render() {
    const {name, bks, mobile} = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav title='Thông tin giấy tờ xe'/>
        <ScrollView keyboardShouldPersistTaps='always'>
          <View style={{padding: 20}}>
            <Input
              label='Họ và tên'
              value={name}
              onChangeText={text => this.setState({name: text})}
            />
            <Input
              label='Biển số xe'
              value={bks}
              onChangeText={text => this.setState({bks: text})}
            />
            <Input
              label='Số điện thoại'
              value={mobile}
              keyboardType='numeric'
              onChangeText={text => this.setState({mobile: text})}
            />
          </View>
        </ScrollView>
        <FooterButton>
          <Button
            label='TIẾP TỤC'
            marginTop={0}
            onPress={() => this.next()}
          />
        </FooterButton>
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {updateInfo} from '../../actions/buy';
import Nav from '../../../components/Nav';
import FooterButton from '../../../components/FooterButton';
import Input from '../../../components/Input';
import Loading from '../../../components/Loading';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateInfo: (body) => dispatch(updateInfo(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarUpdateInfo);
