import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Keyboard
} from 'react-native';
import Css from '../../../config/Css'
import Nav from '../../../components/Nav';
import InputProducer from '../../components/buy/InputProducer';
import InputYear from '../../components/buy/InputYear';
import Button from '../../../components/Button';
import InputModel from '../../components/buy/InputModel';
import InputSeat from '../../components/buy/InputSeat';
import Loading from '../../../components/Loading';
import FooterButton from '../../../components/FooterButton';

class CarProducer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idProducer: null,
      idModel: null,
      car: {},
      openYear: null,
      year: '',
      producer: '',
      openProducer: null,
      model: '',
      openModel: null,
      seat: '',
      openSeat: null,
    };
  }

  componentWillMount = () => {
    // this.props.setProducer('producer')
    var body = {
      function: 'InsoSupplierApi_searchProducerCar',
      params: {
        keyword: ''
      }
    }
    this.props.searchProducer(body)
  };

  setIdProducer = (id, name) => {
    var car = this.state.car;
    car['name']= name;
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
    this.setState({idProducer: id, car, producer: name})

  }

  setYear = (year) => {
    var car = this.state.car;
    car['year']=year;
    this.setState({year, car})
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
    var car = this.state.car;
    car['model'] = model;
    this.setState({idModel: id, car, model})
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
    var car = this.state.car;
    car['seat']=seat;
    this.setState({seat, car})
  }

  next =() => {
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
    Keyboard.dismiss()
    var body = {
      function: 'InsoSupplierApi_getInsuranceAmountCar',
      params: {
        vehicle_model_id: idModel,
        manufacture_year: year,
        number_seats: seat
      },
    }
    this.props.carGetPrice(body, this.state.car)
  }

  back = () => {
    const {openProducer, openModel, openYear, openSeat} = this.state;
    if(this.props.back == 'again') {
      Actions.tab({type: 'reset'})
      return
    }
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
    const {
      openProducer, producer,
      openYear, year,
      openModel, model,
      openSeat, seat
    } = this.state;
    return (
      <View style={Css.container}>
        {
          this.props.carBuy.loading ?
          <Loading/>
          : null
        }
        <Nav
          onPress={() => this.back()}
          title='Mua bảo hiểm cho ô tô'
        />
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <View style={{flex: 1, padding: 15,}}>
              <InputProducer
                openModal = {() => this.setState({openProducer: true})}
                keyword={producer}
              />
              <InputYear
                openModal = {() => this.setState({openYear: true})}
                keyword={year}
                producer={producer}
                keyboardType='numeric'
              />
              <InputModel
                year={year}
                openModal = {() => this.setState({openModel: true})}
                keyword={model}
              />
              <InputSeat
                model={model}
                openModal = {() => this.setState({openSeat: true})}
                keyword={seat}

                // setSeat={seat => this.setSeat(seat)}
                // keyboardType='numeric'
              />
            </View>
            
          </ScrollView>
          <FooterButton>
            <Button
              label='TIẾP THEO'
              marginTop={0}
              onPress={() => this.next()}
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
      </View>
    );
  }
}

import {connect} from 'react-redux';
import {
  searchProducer,
  getYear,
  getModel,
  getSeat,
  carGetPrice,
  setProducer
} from '../../actions/buy';
import SimpleToast from 'react-native-simple-toast';
import ModalProducer from '../../components/buy/ModalProducer';
import ModalYear from '../../components/buy/ModalYear';
import ModalModel from '../../components/buy/ModalModel';
import ModalSeat from '../../components/buy/ModalSeat';
import { Actions } from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setProducer: (action) => dispatch(setProducer(action)),
    carGetPrice: (body, car) => dispatch(carGetPrice(body, car)),
    getSeat: (body) => dispatch(getSeat(body)),
    getModel: (body) => dispatch(getModel(body)),
    searchProducer: (body) => dispatch(searchProducer(body)),
    getYear: (body) => dispatch(getYear(body)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CarProducer);
