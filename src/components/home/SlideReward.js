
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import Swiper from 'react-native-swiper';
import { screen } from '../../config/System';

const width = (screen.width-70)/4
class SlideReward extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Swiper
        style={css.slide}
        activeDotColor='#23d599'
        dotColor='#d6d6d6'
        // containerStyle={{backgroundColor: 'red',}}
      >
        <View style={{marginTop: 10,flexDirection: 'row',}}>
          <View style={css.ctItem}></View>
          <View style={css.ctItem}></View>
          <View style={css.ctItem}></View>
          <View style={css.ctItem}></View>
        </View>
        <View style={{marginTop: 10}}>
          <View style={css.ctItem}></View>
        </View>
      </Swiper>
    );
  }
}

const css = StyleSheet.create({
  slide: {
    width: screen.width-20,
    height: width+50,
  },
  ctItem: {
    borderColor: '#e7e7e7',
    width, 
    height: width,
    marginRight: 10,
    borderRadius: width/2,
    borderWidth: 1,
  },
})

export default SlideReward;
