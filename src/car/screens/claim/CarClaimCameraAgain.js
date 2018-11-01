import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  NativeModules,
  ImageEditor,
  ImageStore
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { screen } from '../../../config/System';
import Loading from '../../../components/Loading'
import ImageResizer from 'react-native-image-resizer';

const height = screen.height-150;
const width = screen.width - 100;
const imageSize = {
  size: {
    width: 600,
    height: 600
  },
  offset: {
    x: 0,
    y: 0,
  },
  resizeMode: 'contain',
};

class TakePhotoAgain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: null
    };
  }

  async takePicture () {
    this.setState({loading: true})
    if (this.camera) {
      const options = { quality: 0.5, base64: true};
      const res = await this.camera.takePictureAsync(options)
      // var uri = `data:image/png;base64,${data.base64}`;
      var uri = res.uri;
      ImageStore.getBase64ForTag(uri, (data)=> {
        var base64 = `data:image/png;base64,${data}`;
        if(this.props.action == 'FORM_IMAGE_CAR') {
          this.props.updateImage({
            name: 'IMAGE_'+this.props.active,
              value: base64,
              path: uri,
          }, 'FORM_IMAGE_CAR')
        }else {
          this.props.updateImage(base64, this.props.action)
        }
        Actions.pop()
      },(e) => {
        console.log(e);
      })
    }
  };

  renderImage = (active) => {
    switch(active) {
      case 1:
        return require('../../../icons/corner_1.png');
      case 2:
        return require('../../../icons/corner_2.png');
      case 3:
        return require('../../../icons/corner_3.png');
      case 4:
        return require('../../../icons/corner_4.png');
      case 5:
        return require('../../../icons/corner_5.png');
      default:
        return
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.loading ?
          <Loading/>
          : null
        }
         <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style = {styles.preview}
          // flashMode={RNCamera.Constants.FlashMode.torch}
          permissionDialogTitle={'Permission to use camera'}
          permissionDialogMessage={'We need your permission to use your camera phone'}
      >
       <Image style={this.props.active == 5 ? styles.form1 : styles.form} source={this.renderImage(this.props.active)}/>
      </RNCamera>
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
          onPress={() => this.takePicture()}
          style = {styles.capture}>
          <View style={{width: 40, height: 40,borderRadius: 20, borderWidth: 2, borderColor: '#000'}}></View>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  form: {
    height,
    resizeMode: 'contain'
  },
  form1: {
    width,
    resizeMode: 'contain'
  },
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
});

import {connect} from 'react-redux';
import {updateImage, getProfile} from '../../actions/claim';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateImage: (body, action) => dispatch(updateImage(body, action)),
    getProfile: (body) => dispatch(getProfile(body))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TakePhotoAgain);
