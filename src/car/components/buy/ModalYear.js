
import React from 'react';
import {
  Text,
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import ModalBox from 'react-native-modalbox';
import Button from '../../../components/Button';
import { screen, TxtBlack, Color } from '../../../config/System';
import { Actions } from 'react-native-router-flux';

class ModalYear extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      years: [],
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carBuy.years) {
      this.setState({
        years: nextProps.carBuy.years
      })
    }
  };

  onChangeText = (text) => {
    var a = this.props.carBuy.years;
    var b = [];
    for(let i = 0; i< a.length; i++) {
      if(a[i].search(text) == 0) {
        b.push(a[i])
      }
    }
    this.setState({years: b})
    // this.props.setId()
  }

  setProducer = (data) => {
    this.props.setYear(data)
    this.props.onClosed()
  }

  render() {
    const {years} = this.state
    const {onClosed, open} = this.props;
    return (
      <ModalBox
        isOpen={open}
        entry={'top'}
        onClosed={onClosed}
        style={css.ctModal}
      >
        <View style={{backgroundColor: '#fff',flex: 1, padding: 20 }}>
          <View style={css.ctInput}>
            <TextInput
              placeholder='Tìm năm sản xuất'
              onChangeText={text => this.onChangeText(text)}
              keyboardType={'numeric'}
              style={{
                padding: 5,
                paddingLeft: 10,
              }}
            />
          </View>
          <ScrollView keyboardShouldPersistTaps='always'>
            {
              years.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => this.setProducer(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#ccc',alignItems: 'center', padding: 10, paddingLeft: 15}} key={index}>
                  <Text>{item}</Text>
                </TouchableOpacity>
              )
              })
            }
          </ScrollView>
        </View>
      </ModalBox>
    )
  }

}

const css = StyleSheet.create({
  ctModal: {
    backgroundColor: '#ababab',
    flex: 1
  },
  ctInput: {
    borderWidth: 1,
    borderColor: Color
  },
})

import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {
    carBuy: state.carBuy
  }
}

export default connect(mapStateToProps)(ModalYear);
