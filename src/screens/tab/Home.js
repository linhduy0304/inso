import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image
 } from 'react-native';
import Css from '../../config/Css';
import Header from '../../components/home/Header';
import Button from '../../components/Button';
import SlideReward from '../../components/home/SlideReward';
import Drawer from 'react-native-drawer';
import Menu from '../../components/home/Menu';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        avatar: 'https://scontent.fhan1-1.fna.fbcdn.net/v/t1.0-1/p320x320/23435208_1370641299732305_8474130157267942072_n.jpg?_nc_cat=0&oh=90a62facfff6b5059989a6acd41bdd91&oe=5C2C3E23',
        name: 'LÊ LINH DUY',
        reward: '500'
      }
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Drawer
          openDrawerOffset={80}
          tapToClose={true}
          tweenHandler={(ratio) => ({
            main: { opacity:(2-ratio)/2 }
          })}
          ref={(ref) => this._drawer = ref}
          content={<Menu data={this.state.user} />}
          >
          <ScrollView>
            <Header open={() => this._drawer.open()}/>
            <View style={{padding: 20, paddingTop: 0}}>
              <View style={{flexDirection: 'row'}}>
              <Button
                label='TẠO YÊU CẦU BỒI THƯỜNG'
                onPress={() => Actions.carClaimList()}
              />
               {/* <Button
                label='HỖ TRỢ'
              /> */}
              </View>
             
              <Text style={{color: '#323643', marginTop: 15,}}>Các ưu đãi đổi điểm thưởng</Text>
              <SlideReward/>
              <View style={{alignItems: 'flex-end',}}>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                  <Text style={{color: '#666666', marginRight: 10}}>Xem tất cả các ưu đãi</Text>
                  <Image style={{height:10, width: 10*11/18}} source={require('../../icons/ic_arrow_right.png')}/>
                </View>
              </View>
            </View>
          </ScrollView>
        </Drawer>
        
      </View>
    );
  }
}

export default Home;
