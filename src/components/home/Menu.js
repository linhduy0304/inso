

import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import {menu, app_version, TxtBlack} from '../../config/System';
import { Actions } from 'react-native-router-flux';
import Gradient from '../Gradient';
import Store from '../../services/Store';
const Const = require('../../services/Const');



class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  logout = () => {
    
    var body = {
      function: 'CustomerUserApi_logout',
      params: {
      },
    }
    this.props.logout(body)
    Actions.login({type: 'reset'})
  }

  onPress = (index) => {
    switch(index) {
      case 0: //profile
        return;
      case 1: //history
        return; 
      case 2: //buy
        // Actions.buyList();
        return;
      case 3: //compensation
        // Actions.compensationList();
        return;
      case 'logout': //compensation
         Alert.alert(
          'Đăng xuất',
          'Bạn có muốn đăng xuất ứng dụng',
          [
            {text: 'Huỷ', onPress: (() => null)},
            {text: 'Thoát', onPress: () => this.logout()},
          ],
        )
        return;
      default: 
        return;
    }
  }

  render() {
    const {data} = this.props;
    return(
      <View style={{flex: 1}}>
        <Gradient
          borderRadius={0}
          colors={['#0cc5b7','#13caad','#1acfa5','#1fd29e','#27d794', '#2bda8f']}
        >
          <View style={css.header}>
            <Image style={css.avatar} source={{uri: data.avatar}}/>
            <Text style={css.name}>{data.name}</Text>
            <Text style={css.phone}>Điểm thưởng: {data.reward} IP</Text>
          </View>
        </Gradient>
        <View style={{flex: 1}}>
        {
          menu.map((item, index) => {
            return (
              <TouchableOpacity onPress={() => this.onPress(item.type)} style={css.ctItem} key={index}>
                <View style={{width: 20, alignItems: 'center', justifyContent: 'center'}}>
                  <Image style={{width: item.width, height: item.height}} source={item.icon}/>
                </View>
                <Text style={css.label}>{item.label}</Text>
              </TouchableOpacity>
            )
          })
        }
        </View>
        
        <Text style={css.version}>INSO Version {app_version}</Text>
      </View>
    )
  }
}

const css = StyleSheet.create({
  version: {
    textAlign: 'center',
    margin: 10,
    fontSize: 12
  },
  phone: {
    marginTop: 5,
    color: '#fff'
  },
  label: {
    marginLeft: 15,
    flex: 1,
    color: '#333'
  },
  ctItem: {
    flexDirection: 'row',
    padding: 15,
    paddingLeft: 20,
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  header: {
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
  },
})

import {connect} from 'react-redux';
import {logout} from '../../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (body) => dispatch(logout(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
