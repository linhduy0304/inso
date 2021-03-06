
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
    const {corner} = this.props.carBuy.profile
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
        
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={css.txt}>Tem đăng kiểm</Text>
            {
                corner.IMAGE_5.reason ?
                    <Image style={{marginLeft: 4, width: 15, height: 15*25/26}} source={require('../../../icons/ic_error.png')}/>
                : null
            }
			</View>
			{
				corner.IMAGE_5.reason ? 
					<Text style={[css.txt, {color: '#5c5c5c', maxWidth: 80}]}>{corner.IMAGE_5.reason}</Text>
				: null
			}
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

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
export default connect(mapStateToProps)(CornerFive);
