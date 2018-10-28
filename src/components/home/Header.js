
import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Nav from './Nav';
import ItemInsu from './ItemInsu';
import { screen } from '../../config/System';
const height = 25;
const list1 = [
  {
    icon: require('../../icons/ic_oto.png'),
    title: 'ô tô',
    type: 'oto',
    height,
    width: height*97/40,
    right: 0,
    left: 0
  },
  {
    icon: require('../../icons/ic_health.png'),
    title: 'sức khoẻ',
    height,
    width: height*57/54,
    right: 0,
    left: 0
  },
  {
    icon: require('../../icons/ic_building.png'),
    title: 'nhà riêng',
    height,
    width: height*57/51,
    right: 0,
    left: 0
  },
]
const list2 = [
  {
    icon: require('../../icons/ic_plane.png'),
    title: 'du lịch',
    height,
    width: height*67/59,
    right: 5,
    left: 0
  },
  {
    icon: require('../../icons/ic_love.png'),
    title: 'tình yêu',
    height,
    width: height*42/57,
    left: 5,
    right: 0
  }
]

const renderView = () => {
  var a = [];
  for(let i = 0; i < screen.width/20;i++ ) {
    a.push(
      <View key={i} style={{height: 10, width: 10,borderRadius: 5, backgroundColor: '#fff', marginLeft: 5, marginRight: 5}}></View>
    )
  }
  return a
}

const Header = ({
  open,
}) => (
    <View>
      <LinearGradient
        start={{x: 0.0, y: 0.0}} 
        end={{x: 1.0, y: 1.0}}
        style={{
        }}
        colors={['#0bc5b8','#1ed29f','#1dd1a1','#2bda8f']} >
        <View style={{paddingBottom: 20}}>
          <Nav open={open}/>
          <Text style={css.intro}>Mua bảo hiểm</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20,}}>
            {
              list1.map((item, index) => {
                return <ItemInsu key={index} data={item}/>
              })
            }
          </View>
          <View style={{flexDirection: 'row', paddingLeft: 20, paddingRight: 20, justifyContent: 'center'}}>
            {
              list2.map((item, index) => {
                return <ItemInsu key={index} data={item}/>
              })
            }
          </View>
          <View style={{flexDirection: 'row',position: 'absolute',bottom: -5}}>
            {renderView()}
          </View>
        </View>
      </LinearGradient>
    </View>
);

const css = StyleSheet.create({
  intro: {
    color: '#fff',
    marginLeft: 20
  }
})

export default Header;
