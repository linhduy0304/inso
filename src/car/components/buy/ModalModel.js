
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

class ModalModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      models: [],
    };
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.carBuy.models) {
      this.setState({
        models: nextProps.carBuy.models
      })
    }
  };

  onChangeText = (text) => {
    var a = this.props.carBuy.models;
    var b = [];
    var newText = text.toUpperCase()
    for(let i = 0; i< a.length; i++) {
      if(a[i].code.toUpperCase().search(newText) == 0) {
        b.push(a[i])
      }
    }
    this.setState({models: b})
  }

  setModel = (data) => {
    this.props.setModel(data.vehicle_model_id, data.code)
    this.props.onClosed()
  }

  render() {
    const {models} = this.state
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
              placeholder='Tìm dòng xe'
              onChangeText={text => this.onChangeText(text)}
              style={{
                padding: 5,
                paddingLeft: 10,
              }}
            />
          </View>
          <ScrollView keyboardShouldPersistTaps='always'>
            {
              models.map((item, index) => {
              return (
                <TouchableOpacity onPress={() => this.setModel(item)} style={{flexDirection: 'row',borderBottomWidth: 1,borderTopWidth: 0, borderColor: '#ccc',alignItems: 'center', padding: 10, paddingLeft: 15}} key={index}>
                  <Text>{item.code}</Text>
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
export default connect(mapStateToProps)(ModalModel);
