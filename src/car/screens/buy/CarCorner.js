

import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  BackHandler
} from 'react-native';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import FooterButton from '../../../components/FooterButton';
import { screen } from '../../../config/System';
import CornerOne from '../../components/requirement/CornerOne';
import CornerTwo from '../../components/requirement/CornerTwo';
import Modal from '../../components/Modal';
import Loading from '../../../components/Loading';

const height = screen.height*2/3;
const width = (height-100)*297/673;

class CarCorner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: {},
      open: null,
      openImage: null
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    
    return false;
  }

  save() {
    const {corner}= this.props.carBuy.profile
    var body = {
      function: 'InsoContractApi_updateContractProfile',
      params: {
        contract_id: this.props.contract_id, //this.props.contract_id
        data: [
          {
            form_code: this.props.form_code,
            fields: {
              IMAGE_1: corner.IMAGE_1.value ? corner.IMAGE_1.value : '',
              IMAGE_2: corner.IMAGE_2.value ? corner.IMAGE_2.value : '',
              IMAGE_3: corner.IMAGE_3.value ? corner.IMAGE_3.value : '',
              IMAGE_4: corner.IMAGE_4.value ? corner.IMAGE_4.value : '',
              IMAGE_5: corner.IMAGE_5.value ? corner.IMAGE_5.value : '',
            }
          }
        ]
      },
    }
    this.props.updateContract(body)
  }

  showImage = (image) => {
    this.setState({
      image,
      openImage: true
    })
  }

  render() {
    console.log(this.props.carBuy.profile)
    const {open, openImage, image} = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav title='Chụp ảnh xe'/>
          <View style={{padding: 20, flex: 1, alignItems: 'center', justifyContent: 'center',}}>
            <Image style={{height: height- 100,width}} source={require('../../../icons/car.png')}/>
            <CornerOne
              showImage={image => this.showImage(image)}
              image = {this.props.carBuy.paths.IMAGE_1 ? this.props.carBuy.paths.IMAGE_1 : this.props.carBuy.profile.corner.IMAGE_1.value}
            />
            <CornerTwo showImage={image => this.showImage(image)} image = {this.props.carBuy.paths.IMAGE_2 ? this.props.carBuy.paths.IMAGE_2 : this.props.carBuy.profile.corner.IMAGE_2.value}/>
            <CornerThree showImage={image => this.showImage(image)} image = {this.props.carBuy.paths.IMAGE_3 ? this.props.carBuy.paths.IMAGE_3 : this.props.carBuy.profile.corner.IMAGE_3.value}/>
            <CornerFour showImage={image => this.showImage(image)} image = {this.props.carBuy.paths.IMAGE_4 ? this.props.carBuy.paths.IMAGE_4 : this.props.carBuy.profile.corner.IMAGE_4.value}/>
            <CornerFive showImage={image => this.showImage(image)} image = {this.props.carBuy.paths.IMAGE_5 ? this.props.carBuy.paths.IMAGE_5 : this.props.carBuy.profile.corner.IMAGE_5.value}/>
          </View>
        <FooterButton>
          <Button
            label='XÁC NHẬN'
            marginTop={0}
            onPress={() => this.save()}
          />
        </FooterButton>
        <ModalShowImage
          open={openImage}
          image={image}
          onClosed={() => this.setState({openImage: false})}
        />
        <Modal
          open={open}
          cancel='ĐỂ SAU'
          content='Bạn đã hoàn thành chụp ảnh xe 5 góc, chúng tôi sẽ kiểm tra và thông báo lại cho bạn trong 5 phút'
          onClosed={() => this.setState({open: false})}
        />
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {updateContract} from '../../actions/buy';
import Nav from '../../../components/Nav';
import CornerThree from '../../components/requirement/CornerThree';
import CornerFour from '../../components/requirement/CornerFour';
import CornerFive from '../../components/requirement/CornerFive';
import ModalShowImage from '../../components/buy/ModalShowImage';
import { Actions } from 'react-native-router-flux';


const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    updateContract: (body) => dispatch(updateContract(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarCorner);
