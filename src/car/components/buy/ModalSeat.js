
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

class ModalSeat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seats: [],
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carBuy.seats) {
      this.setState({
        seats: nextProps.carBuy.seats
      })
    }
  };

  onChangeText = (text) => {
    var a = this.props.carBuy.seats;
    var b = [];
    for(let i = 0; i< a.length; i++) {
      if(a[i].search(text) == 0) {
        b.push(a[i])
      }
    }
    this.setState({seats: b})
  }

  setSeat = (data) => {
    this.props.setSeat(data)
    this.props.onClosed()
  }

  render() {
    const {seats} = this.state
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
              placeholder='Tìm số chỗ ngồi'
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
              seats.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => this.setSeat(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#ccc',alignItems: 'center', padding: 10, paddingLeft: 15}} key={index}>
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

export default connect(mapStateToProps)(ModalSeat);
