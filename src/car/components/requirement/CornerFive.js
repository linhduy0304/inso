
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { Actions } from 'react-native-router-flux';

class CornerFive extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onPress = () => {
    if(this.props.image) {
      var image = {
        uri: this.props.image,
        active: 5,
      }
      this.props.showImage(image)
    }else {
      Actions.takePhoto({active: 5, action: 'FORM_IMAGE_CAR'})
    }
  }

  render() {
    return (
      <View style={css.ct}>
        <TouchableOpacity onPress={() => this.onPress()} style={css.ctImage}>
          {
            this.props.image ?
            <Image style={{width: 60, height: 60}} source={{uri: this.props.image}}/>
            : null
          }
          <Image style={css.icCamera} source={require('../../../icons/ic_camera.png')}/>
        </TouchableOpacity>
        <Text style={css.txt}>Tem đăng kiểm</Text>
      </View>
    );
  }
}

const css = StyleSheet.create({
  txt: {
    color: '#333',
    marginTop: 5,
  },
  icCamera: {
    height: 15,
    width: 15*48/38,
    position: 'absolute'
  },
  ctImage: {
    width: 60,
    height: 60,
    borderRadius: 4,
    backgroundColor: '#e4e4e4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ct: {
    position: 'absolute',
    alignItems: 'center',
    left: 20
  },
})

export default CornerFive;
