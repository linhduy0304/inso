

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity
} from 'react-native';
import Container from '../../components/auth/Container';
import Input from '../../components/auth/Input';
import Button from '../../components/Button';
import { screen} from '../../config/System';
import StBarIos from '../../components/StBarIos';
import { Actions } from 'react-native-router-flux';
import RNAccountKit, {Color} from 'react-native-facebook-account-kit'
import Loading from '../../components/Loading';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
    };
  }

  componentDidMount = () => {
    RNAccountKit.configure({
      //countryWhitelist: [ "AR", "BR", "US" ],
      //countryBlacklist: [ "BR" ],
      //defaultCountry: "AR"
      initialEmail: 'example.com',
      defaultCountry: "VN",
      // initialPhoneNumber: '0973425393',
      theme: {
        // Background dbf8f0
        headerBackgroundColor: Color.rgb(11, 197, 184),
        inputBackgroundColor: Color.hex('#dbf8f0'),
        buttonBackgroundColor: Color.rgb(11, 197, 184),
        buttonTextColor: Color.rgb(255, 255, 255),
      }
    })
  };

  onChangeText = text => {
    var b = text.replace(/\./g,'')
    var a = Number(b);
    if(isNaN(a) || !isFinite(a)) {
      return
    }
    this.setState({mobile:b})
  }

  otpFB = () => {
    RNAccountKit.loginWithPhone()
    .then((token) => {
      if (!token) {
        console.log('Login cancelled')
      } else {
        var body = {
          function: 'CustomerUserApi_verifyAccessTokenFacebookAccountKit',
          params: {
            access_token: token.token,
          },
        }
        this.props.register(body)
        // RNAccountKit.getCurrentAccessToken()
        // .then((token) => {
        //   console.log(token)
        // })
        // RNAccountKit.getCurrentAccount().then(account => {
        //   if(account) {
        //     console.log(account)
        //     Actions.register({account: account})
        //   }
        // })
      }
    })
  };

  login = () => {
    if(this.state.mobile == '') {
      SimpleToast.show('Bạn chưa nhập số điện thoại');
      return
    }
    var body = {
      function: 'CustomerUserApi_login',
      params: {
        mobile: this.state.mobile,
      },
    }
    this.props.login(body)
  }

  render() {
    const {password, mobile} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#0bc5b8'}
          barStyle='light-content'
        />
        {
          Platform.OS === 'ios' ?
            <StBarIos backgroundColor={Color}/>
            : null
        }
        {
          this.props.auth.loading ?
          <Loading/>
          : null
        }
        <Container>
          <View style={{marginTop: 15,padding: 20, backgroundColor: '#fff', borderRadius: 7,width: screen.width-60}}>
            <Text style={{color: '#333', fontSize: 20}}>Đăng nhập</Text>
            <Input
              label='Số điện thoại'
              value={mobile}
              keyboardType={'numeric'}
              onChangeText={text => this.onChangeText(text.trim())}
            />
            {/* <Input
              label='Mật khẩu'
              value={password}
              onChangeText={text => this.setState({password: text})}
              secureTextEntry={true}
            /> */}
            <Button
              label='TIẾP TỤC'
              onPress={() => this.login()}
              width={screen.width-100}
            />
            <Text style={styles.forgot}>Bạn quên mật khẩu ?</Text>
          </View>
          <TouchableOpacity onPress={() => this.otpFB()} style={styles.ctRegister}>
            <Text style={{color: '#b9b9b9'}}>Bạn chưa có tài khoản? <Text style={{color: '#666', fontWeight: 'bold'}}>Đăng ký</Text></Text>
          </TouchableOpacity>
        </Container>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctRegister: {
    backgroundColor: '#f0f0f0',
    width: screen.width-80,
    height: 45,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#0bc5b8',
  },
  forgot: {
    color: '#333',
    textAlign: 'center',
    marginTop: 15
  },
})

import {connect} from 'react-redux';
import {login, register} from '../../actions/auth';
import SimpleToast from 'react-native-simple-toast';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    login: (body) => dispatch(login(body)),
    register: (body) => dispatch(register(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
