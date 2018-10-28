
import React, { Component } from 'react';
import { Text, View, Image, WebView} from 'react-native';
import Modal from 'react-native-modalbox';
import { screen, TxtBlack } from '../../config/System';

class ModalPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri: null
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.buy.webPay) {
      this.setState({
        uri: nextProps.buy.webPay
      })
    }
  };
  

  render() {
    const {uri} = this.state;
    const {onClosed, open} =this.props;
    return (
      <Modal
        isOpen={open}
        entry={'top'}
        swipeToClose={false}
        onClosed={onClosed}
        style={{backgroundColor: 'ababab', width: screen.width, height: screen.height}}
        >
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <WebView
            onNavigationStateChange={(event) => {
              if(event.url == 'http://192.168.11.14/mtq/inso/close_webview') {
                onClosed()
              }
              // if (event.url !== uri) {
              //   this.webview.stopLoading();
              //   Linking.openURL(event.url);
              // }
            }}
            source={{uri}}
            style={{marginTop: 20, }}
          />
        </View>
      </Modal>
    )
  }
}

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    buy: state.buy
  }
}

export default connect(mapStateToProps)(ModalPay);
