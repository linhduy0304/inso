

import React, { Component } from 'react';
import { 
  View,
  Text, 
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
  ImageBackground
} from 'react-native';

import Input from '../../../components/Input'
import Button from '../../../components/Button';
import { Actions } from 'react-native-router-flux';
import { TxtBlack, screen, TxtGrey } from '../../../config/System';
import ModalProducer from '../../components/buy/ModalProducer';
import ModalYear from '../../components/buy/ModalYear';
import ModalModel from '../../components/buy/ModalModel';
import ModalSeat from '../../components/buy/ModalSeat';

import InputProducer from '../../components/buy/InputProducer';
import InputYear from '../../components/buy/InputYear';
import InputModel from '../../components/buy/InputModel';
import InputSeat from '../../components/buy/InputSeat';
import SimpleToast from 'react-native-simple-toast';
import Modal from '../../components/Modal';
const Css = require('../../../config/Css');

class CarCertificate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: '',
      producer: '',
      model: '',
      year: '',
      seat: '',
      uri: this.props.image,

      idProducer: null,
      idModel: null,
      openYear: null,
      openProducer: null,
      openModel: null,
      openSeat: null,
      open: null,
    };
  }

  componentWillMount = () => {
    const {certificate} = this.props.carBuy.profile
    this.setState({
      profile: certificate,
      idProducer: certificate.VEHICLE_MODEL_ID.vehicle_producer_id,
      idModel: certificate.VEHICLE_MODEL_ID.vehicle_model_id,
      producer: certificate.VEHICLE_MODEL_ID.vehicle_producer_name,
      model: certificate.VEHICLE_MODEL_ID.vehicle_model_code,
      year: certificate.MANUFACTURE_YEAR.value,
      seat: certificate.NUMBER_SEATS.value,
    })
    var producer = {
      function: 'InsoSupplierApi_searchProducerCar',
      params: {
        keyword: ''
      }
    }
    this.props.searchProducer(producer)
    if(certificate.MANUFACTURE_YEAR.value) {
      var body = {
        function: 'InsoSupplierApi_getYearManufacture',
        params: {
          vehicle_producer_id: certificate.VEHICLE_MODEL_ID.vehicle_producer_id
        },
      }
      this.props.getYear(body)
    }
    if(certificate.VEHICLE_MODEL_ID.vehicle_model_id) {
      var body = {
        function: 'InsoSupplierApi_getModelCar',
        params: {
          vehicle_producer_id: certificate.VEHICLE_MODEL_ID.vehicle_producer_id,
          manufacture_year: certificate.MANUFACTURE_YEAR.value,
        },
      }
      this.props.getModel(body)
    }
    if(certificate.NUMBER_SEATS.value) {
      var body = {
        function: 'InsoSupplierApi_getNumberSeats',
        params: {
          vehicle_model_id: certificate.VEHICLE_MODEL_ID.vehicle_model_id,
          manufacture_year: certificate.MANUFACTURE_YEAR.value
        },
      }
      this.props.getSeat(body)
    }
  };
  
  componentWillReceiveProps = (nextProps) => {
    this.setState({open: nextProps.carBuy.showChangeFee})
    if(nextProps.carBuy.profile.certificate) {
      this.setState({
        uri: nextProps.carBuy.profile.certificate.IMAGE.value
      })
    }
    // if(nextProps.carBuy.profile && nextProps.carBuy.profile != this.props.carBuy.profile) {
    //   console.log('ooo')
    //   this.setState({
    //     profile: nextProps.carBuy.profile.certificate,
    //     // plates: nextProps.carBuy.profile.certificate.NUMBER_PLATES.value,
    //     producer: nextProps.carBuy.profile.certificate.VEHICLE_MODEL_ID.vehicle_producer_name,
    //     model: nextProps.carBuy.profile.certificate.VEHICLE_MODEL_ID.vehicle_model_code,
    //     year: nextProps.carBuy.profile.certificate.MANUFACTURE_YEAR.value,
    //     seat: nextProps.carBuy.profile.certificate.NUMBER_SEATS.value,
    //   })
    // }
  };

  setIdProducer = (id, name) => {
    if(id !== this.state.idProducer) {
      this.props.setProducer('producer')
      this.setState({
        year: '',
        idModel: null,
        model: '',
        seat: '',
      })
    }
    var body = {
      function: 'InsoSupplierApi_getYearManufacture',
      params: {
        vehicle_producer_id: id
      },
    }
    this.props.getYear(body)
    this.setState({idProducer: id, producer: name})

  }

  setYear = (year) => {
    this.setState({year})
    if(year) {
      if(year !== this.state.year) {
        this.props.setProducer('year')
        this.setState({
          idModel: null,
          model: '',
          seat: ''
        })
      }
      var body = {
        function: 'InsoSupplierApi_getModelCar',
        params: {
          vehicle_producer_id: this.state.idProducer,
          manufacture_year: year,
        },
      }
      this.props.getModel(body)
    }
  }

  setIdModel = (id, model) => {
    this.setState({idModel: id, model})
    if(id) {
      if(id !== this.state.idModel) {
        this.props.setProducer('model')
        this.setState({
          seat: ''
        })
      }
      var body = {
        function: 'InsoSupplierApi_getNumberSeats',
        params: {
          vehicle_model_id: id,
          manufacture_year: this.state.year
        },
      }
      this.props.getSeat(body)
    }
  }

  setSeat = (seat) => {
    this.setState({seat})
  }

  save() {
    Keyboard.dismiss()
    const {idModel, year, seat, idProducer} = this.state;
    if(!idProducer) {
      SimpleToast.show('Bạn chưa nhập hãng xe');
      return
    }
    if(!year) {
      SimpleToast.show('Bạn chưa nhập năm sản xuất');
      return
    }
    if(!idModel) {
      SimpleToast.show('Bạn chưa nhập dòng xe');
      return
    }
    if(!seat) {
      SimpleToast.show('Bạn chưa nhập số chỗ ngồi');
      return
    }
    var body = {
      function: 'InsoContractApi_checkChangeFeeForNewProfileData',
      params: {
        contract_id: this.props.contract_id,
        data: [
          {
            form_code: 'FORM_CERTIFICATE_CAR',
            fields: {
              IMAGE: this.state.uri,
              VEHICLE_MODEL_ID: idModel,
              MANUFACTURE_YEAR: year,
              NUMBER_SEATS: seat,
            }
          }
        ]
      },
    }
    this.props.checkChangeProfile(body)
  }

  submit = () => {
    const {idModel, year, seat, producer, model} = this.state;
    this.setState({open: null})
    var body = {
      function: 'InsoContractApi_cancelAndResetProfile',
      params: {
        contract_id: this.props.contract_id,
        data: [
          {
            form_code: 'FORM_CERTIFICATE_CAR',
            fields: {
              IMAGE: this.props.image,
              VEHICLE_MODEL_ID: idModel,
              MANUFACTURE_YEAR: year,
              NUMBER_SEATS: seat,
            }
          }
        ]
      },
    }
    var car = {
      name: producer,
      year: year,
      model: model,
      seat: seat
    }
    this.props.updateContract(body, car)
  }

  renderItem = (label, value) => {
    return (
      <View style={styles.ctItem}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    )
  }

  back = () => {
    const {openProducer, openModel, openYear, openSeat} = this.state;
    if(openProducer || openModel || openYear || openSeat) {
      this.setState({
        openProducer: null,
        openModel: null,
        openYear: null,
        openSeat: null,
      })
      return
    }
    Actions.pop()
  }

  render() {
    const {producer, model, year, seat, profile,
      openProducer,
      openYear,
      openModel, 
      openSeat, 
      open
    } = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav onPress={() => this.back()} title='Hoàn thành giấy đăng kiểm xe'/>
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{flex: 1, padding: 20,paddingTop: 10}}>
              <View>
                <TouchableOpacity style={{width: screen.width-40, height: 200, alignItems: 'center', justifyContent: 'center'}} onPress={() => Actions.takePhotoAgain({action: 'FORM_CERTIFICATE_CAR'})}>
                  <Image style={{width: screen.width-40, height: 200}} source={{uri: this.state.uri}}>
                  </Image>
                  <Image style={{position: 'absolute',}} source={require('../../../icons/ic_camera.png')}/>
                </TouchableOpacity>
                {
                  profile.IMAGE.reason ?
                    <Text style={{color: '#f97c7c', fontSize: 13}}>{profile.IMAGE.reason}</Text>
                  : null
                }
              </View>
              {
                profile ?
                  <View >
                     <InputProducer
                      openModal = {() => this.setState({openProducer: true})}
                      keyword={producer}
                      />
                     <InputYear
                      openModal = {() => this.setState({openYear: true})}
                      keyword={year}
                      producer={producer}
                    />
                    {
                      profile.MANUFACTURE_YEAR.reason ?
                        <Text style={{color: '#f97c7c', fontSize: 13}}>{profile.MANUFACTURE_YEAR.reason}</Text>
                      : null
                    }
                    <InputModel
                      year={year}
                      openModal = {() => this.setState({openModel: true})}
                      keyword={model}
                    />
                    {
                      profile.VEHICLE_MODEL_ID.reason ?
                        <Text style={{color: '#f97c7c', fontSize: 13}}>{profile.VEHICLE_MODEL_ID.reason}</Text>
                      : null
                    }
                    <InputSeat
                      model={model}
                      openModal = {() => this.setState({openSeat: true})}
                      keyword={seat}
                    />
                    {
                      profile.NUMBER_SEATS.reason ?
                        <Text style={{color: '#f97c7c', fontSize: 13}}>{profile.NUMBER_SEATS.reason}</Text>
                      : null
                    }
                </View>
                : null
              }
            </View>
          </ScrollView>
          <FooterButton>
            <Button
              label='GỬI'
              marginTop={0}
              onPress={() => this.save()}
            />
          </FooterButton>
          <ModalProducer
            open = {openProducer}
            onClosed={() => this.setState({openProducer: null})}
            setIdProducer={(id, name) => this.setIdProducer(id, name)}
          />
          <ModalYear
            open = {openYear}
            onClosed={() => this.setState({openYear: null})}
            setYear={year => this.setYear(year)}
          />
          <ModalModel
            open = {openModel}
            onClosed={() => this.setState({openModel: null})}
            setModel={(id, code) => this.setIdModel(id, code)}
          />
          <ModalSeat
            open = {openSeat}
            onClosed={() => this.setState({openSeat: null})}
            setSeat={seat => this.setSeat(seat)}
          />
        </View>

        <Modal
          open={open}
          cancel='BỎ QUA'
          content= 'Thay đổi của bạn đã làm thay đổi giá trị xe'
          onPressCancel={() => this.setState({open: null})}
          onPressSubmit={() => this.submit()}
        />
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  value: {
    color: '#333',
    flex: 1,
    textAlign: 'center'
  },
  ctItem: {
    flexDirection: 'row',
    marginTop: 15
  },
  label: {
    color: '#999999',
    flex: 1,
  },
  intro: {
    color: TxtBlack
  },
})

import {connect} from 'react-redux';
import {
  updateContract,
  getProfile,
  searchProducer,
  getYear,
  setProducer,
  getModel,
  getSeat,
  checkChangeProfile
} from '../../actions/buy';
import Nav from '../../../components/Nav';
import FooterButton from '../../../components/FooterButton';
import Loading from '../../../components/Loading';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (body) => dispatch(getProfile(body)),
    updateContract: (body, car) => dispatch(updateContract(body, car)),
    searchProducer: (body) => dispatch(searchProducer(body)),
    getYear: (body) => dispatch(getYear(body)),
    getSeat: (body) => dispatch(getSeat(body)),
    getModel: (body) => dispatch(getModel(body)),
    setProducer: (action) => dispatch(setProducer(action)),
    checkChangeProfile: (action) => dispatch(checkChangeProfile(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarCertificate);
