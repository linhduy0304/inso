

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform,
  Image
} from 'react-native';
import Container from '../../components/auth/Container';
import Input from '../../components/auth/Input';
import Button from '../../components/Button';
import { screen, Color } from '../../config/System';
import StBarIos from '../../components/StBarIos';
import { Actions } from 'react-native-router-flux';

class RegisterSuccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '',
      password: '',
    };
  }

  render() {
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
          <View style={{marginTop: 15,padding: 20,alignItems: 'center', backgroundColor: '#fff', borderRadius: 7,width: screen.width-60}}>
            <Image style={{height: 200, width: 200}} source={require('../../icons/ic_modal.png')} />
            <Text style={{color: '#000', fontSize: 16}}>Đăng ký thành công!</Text>
            <Text style={{color: '#333', marginTop: 5, textAlign: 'center'}}>Chúc mừng bạn đã hoàn thành đăng ký tại INSO</Text>
            <Button
              label='Đăng nhập'
              marginTop={20}
              onPress={() => Actions.tab({type: 'reset'})}
              width={screen.width-80}
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

export default RegisterSuccess;
