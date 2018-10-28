

import React, { Component } from 'react';
import { 
  View, 
  Text,
  Image,
  StyleSheet
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home';
import Buy from './Buy';
import Claim from './Claim';
import Help from './Help';

const height = 20;

class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: this.props.tab ? this.props.tab : 'home',
      isLogin: null,
      data: []
    };
  }

  render() {
    return (
      <TabNavigator 
        tabBarStyle={{backgroundColor: '#fff'}}
      >
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'home'}
          title="Trang chủ"
          titleStyle={styles.title}
          selectedTitleStyle={styles.titleActive}
          renderIcon={() => <Image style={{height, width: height*31/32}} source={require('../../icons/ic_home.png')} />}
          renderSelectedIcon={() => <Image style={{height, width: height*31/32}} source={require('../../icons/ic_home_active.png')} />}
          onPress={() => this.setState({ tab: 'home' })}>
          <Home/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'buy'}
          title="Mua bảo hiểm"
          titleStyle={styles.title}
          selectedTitleStyle={styles.titleActive}
          renderIcon={() => <Image style={{height, width: height}} source={require('../../icons/ic_buy.png')} />}
          renderSelectedIcon={() => <Image style={{height, width: height}} source={require('../../icons/ic_buy_active.png')} />}
          onPress={() => this.setState({tab: 'buy'})}>
          <Buy/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'claim'}
          title="Bồi thường"
          titleStyle={styles.title}
          selectedTitleStyle={styles.titleActive}
          renderIcon={() => <Image style={{height, width: height*24/31}} source={require('../../icons/ic_compensation.png')} />}
          renderSelectedIcon={() => <Image style={{height, width: height*24/31}} source={require('../../icons/ic_compensation_active.png')} />}
          onPress={() => this.setState({tab: 'claim'})}>
          <Claim/>
        </TabNavigator.Item>
        <TabNavigator.Item
          tabStyle={styles.ctItem}
          selected={this.state.tab === 'help'}
          title="Hỗ trợ"
          titleStyle={styles.title}
          selectedTitleStyle={styles.titleActive}
          renderIcon={() => <Image style={{height, width: height*31/23}} source={require('../../icons/ic_help.png')} />}
          renderSelectedIcon={() => <Image style={{height, width: height*31/23}} source={require('../../icons/ic_help_active.png')} />}
          onPress={() => this.setState({tab: 'help'})}>
          <Help/>
        </TabNavigator.Item>
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  ctItem: {
    alignItems: 'center',
     justifyContent: 'center'
  },
  title: {
    color: '#999'
  },
  titleActive: {
    color: '#19cea6'
  },
  
})

export default (Tab);
