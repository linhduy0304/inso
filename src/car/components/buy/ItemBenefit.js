
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import { renderVND } from '../../../components/Functions';

class ItemBenefit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      arrPick: []
    }
  }

  componentWillMount = () => {
    const {data} = this.props
    var arrPick = [];
    var price= data.price - data.discount;
    for(let i of data.benefits) {
      if(i.is_default == 1 || i.price == 0) {
        arrPick.unshift(i.id)
        price = price+i.price
      }
    }
    this.setState({
      arrPick
    })
    var body = {
      inso_product_target_id: this.props.data.product_target_id,
      inso_benefit_ids: arrPick
    }
    this.props.addPrice(price)
    this.props.setArrId(body)
  };

  addId = (id, price) => {
    var total = this.props.carBuy.total;
    var arrPick = this.state.arrPick;
    for(var i = 0; i < arrPick.length; i++) {
      if(arrPick[i] == id) {
        arrPick.splice(i, 1);
        total = total - price;
        this.props.setPrice(total)
        this.setState({arrPick})
        return
      }
    }
    arrPick.unshift(id);
    total = total + price;
    this.props.setPrice(total)
    this.setState({arrPick})
  }

  render() {
    const {data, index} = this.props;
    const {arrPick} = this.state;
    return(
      <View>
        <View>
          <Text style={{color: '#333', fontWeight: 'bold', marginTop: 15, marginBottom: 5}}>{index+1}.{data.name}</Text>
          <View style={css.ctItem}>
            <View style={css.ctChecked}>
              <Image style={{width: 15, height: 15*22/27}} source={require('../../../icons/ic_check.png')}/>
            </View>
            <Text style={css.name}>Phí cơ bản</Text>
            <View style={css.ctPrice}>
              <Text style={css.price}>{renderVND(data.price-data.discount)} đ</Text>
            </View>
          </View>
          {
            data.benefits.map((item, i)=> {
              return (
                <View key={i} style={css.ctItem}>
                  {
                    arrPick.indexOf(item.id) !== -1 ? 
                    <TouchableOpacity onPress={() => this.addId(item.id, item.price-item.discount)} disabled={ item.is_default == 1 ? true : false} style={css.ctChecked}>
                      <Image style={{width: 15, height: 15*22/27}} source={require('../../../icons/ic_check.png')}/>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => this.addId(item.id, item.price-item.discount)} disabled={ item.is_default == 1 ? true : false} style={css.ctCheck}/>
                  }
                  <Text style={css.name}>{item.code} {item.name}</Text>
                  <View style={css.ctPrice}>
                    <Text style={css.price}>{renderVND(item.price-item.discount)} đ</Text>
                  </View>
                </View>
              )
            })
          }
          
        </View>
      </View>
    )
  }
}

const css = StyleSheet.create({
  ctChecked: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: '#30cecb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    color: '#333',
    fontSize: 13,
  },
  ctPrice: {
    width: 100,
    alignItems: 'flex-end',
  },
  name: {
    color: '#333',
    flex: 1,
    marginLeft: 15,
    fontSize: 13,
  },
  ctCheck: {
    height: 18,
    width: 18,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  ctItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7
  },
})

import {connect} from 'react-redux';
import {addPrice, setPrice} from '../../actions/buy';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addPrice: (price) => dispatch(addPrice(price)),
    setPrice: (price) => dispatch(setPrice(price)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemBenefit);
