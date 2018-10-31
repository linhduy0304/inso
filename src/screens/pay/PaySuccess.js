
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Keyboard,
  BackHandler
} from 'react-native';
import Css from '../../config/Css';
import FooterButton from '../../components/FooterButton';
import Button from '../../components/Button';
import { screen } from '../../config/System';
import SimpleToast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import {validateEmail} from '../../components/Functions';

class PaySuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    Actions.tab({type: 'reset'})
    return true;
  }

  back = () => {
    if(this.props.back === 'home') {
        Actions.tab({type: 'reset'})
    }else {
        Actions.pop()
    }
  }

  next = () => {
    Keyboard.dismiss()
    const {email} = this.state
    if(email == '') {
      SimpleToast.show('Email không được bỏ trống')
      return;
    }
    if(!validateEmail(email)) {
      SimpleToast.show('Email không hợp lệ')
      return;
    }
    var body = {
      function: 'InsoContractApi_sendInfoToEmail',
      params: {
        contract_id: this.props.contract_id,
        email: email
      },
    }
    this.props.sendEmail(body)
  }

  render() {
    const {email,} = this.state;
    return (
      <View style={[Css.container, {backgroundColor: '#f7f7f7',}]}>
        <LinearGradient
          start={{x: 0.0, y: 0.0}} 
          end={{x: 1.0, y: 1.0}}
          style={{
          }}
          colors={['#0bc5b8','#1ed29f','#1dd1a1','#2bda8f']} >
          <View style={styles.ctNav}>
            <Text style={styles.title}>Thanh toán thành công</Text>
            <TouchableOpacity onPress={this.back} style={styles.ctBack}>
              <Image style={styles.icBack} source={require('../../icons/ic_back.png')}/>
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            {/* <Image style={{width: 100, height: 100}} source={require('../../icons/ic_modal.png')}/> */}
            <Text style={{color: '#fff',marginHorizontal: 20, textAlign: 'center', marginTop: 40}}>Bạn đã hoàn thành quá trình thanh toán. Vui lòng nhập địa chỉ email nhận chứng thực điện tử</Text>
            <View style={styles.ctInput}>
              <TextInput
                placeholder='Email của bạn'
                value={email}
                onChangeText={email => this.setState({email: email.trim()})}
                style={{
                  padding: 0,
                  paddingLeft: 10,
                  height: 40
                }}
              />
            </View>
          </View>
        </LinearGradient>
        <ScrollView>
          <View style={styles.ct}>
            
          </View>
        </ScrollView>
        <FooterButton>
          <Button
            label='GỬI'
            marginTop={0}
            onPress={() => this.next()}
          />
        </FooterButton>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ctInput: {
    backgroundColor: '#fff',
    width: screen.width-40,
    borderRadius: 5,
    marginTop: 20
  },
  txt: {
    color: '#000',
    fontSize: 16,
    marginLeft: 15,
    flex: 1
  },
  ctItem: {
    width: screen.width-40,
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#30cecb',
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
    backgroundColor: '#fff',
  },
  ct: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    
  },
  content: {
    alignItems: 'center',
    height: screen.height/2
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    maxWidth: screen.width/2,
  },
  ctBack: {
    padding: 20,
    position: 'absolute',
    left: 0
  },
  icBack: {
    height: 20,
    width: 20*21/39
  },
  ctNav: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

import {connect} from 'react-redux';
import { sendEmail} from '../../actions/buy';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    buy: state.buy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    sendEmail: (body) => dispatch(sendEmail(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaySuccess);
