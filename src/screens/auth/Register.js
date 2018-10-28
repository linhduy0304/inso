

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Keyboard
} from 'react-native';
import Container from '../../components/auth/Container';
import Input from '../../components/auth/Input';
import Button from '../../components/Button';
import { screen, Color } from '../../config/System';
import StBarIos from '../../components/StBarIos';
import { Actions } from 'react-native-router-flux';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: this.props.account.phoneNumber.number,
      password: '',
      password_confirm: '',
    };
  }

  next() {
    const {password, password_confirm, mobile} = this.state;
    Keyboard.dismiss()
    if(password === '' || password_confirm === '') {
      return SimpleToast.show('Mật khẩu không được bỏ trống')
    }
    if(password !== password_confirm) {
      return SimpleToast.show('Mật khẩu không trùng nhau')
    }
    var body = {
      function: 'CustomerUserApi_registerByMobile',
      params: {
        mobile,
        password,
        time_limit: 0,
      },
    }
    this.props.register(body)
  }

  render() {
    const {password, password_confirm, mobile} = this.state; 
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Color}
          barStyle='light-content'
        />
        {
          Platform.OS === 'ios' ?
            <StBarIos backgroundColor={Color}/>
            : null
        }
        <Container>
          <View style={{marginTop: 15,padding: 20, backgroundColor: '#fff', borderRadius: 7,width: screen.width-60}}>
            <Text style={{color: '#333', fontSize: 20}}>Đăng ký</Text>
            <Input
              label='Số điện thoại'
              value={mobile}
              editable={false}
              onChangeText={text => onChangeText(text)}
            />
            <Input
              label='Mật khẩu'
              value={password}
              onChangeText={text => this.setState({password: text})}
              secureTextEntry={true}
            />
            <Input
              label='Nhập lại mật khẩu'
              value={password_confirm}
              onChangeText={text => this.setState({password_confirm: text})}
              secureTextEntry={true}
            />
            <Button
              label='Tiếp tục'
              marginTop={20}
              onPress={() => this.next()}
              width={screen.width-100}
            />
          </View>
        </Container>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
})

import {connect} from 'react-redux';
import {register} from '../../actions/auth';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    register: (body) => dispatch(register(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
