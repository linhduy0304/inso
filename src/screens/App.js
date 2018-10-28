

import React, { Component } from 'react';
import { View, Text,NetInfo} from 'react-native';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount = () => {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.handleIsConnected(isConnected);
    });
    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this.handleIsConnected
    );
  }

  handleIsConnected = (isConnected) => {
    this.setState({ isConnected });
    if(isConnected) {
      this.props.checkLogin();
    }
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center',}}>
       
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {checkLogin} from '../actions/auth';

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkLogin()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
