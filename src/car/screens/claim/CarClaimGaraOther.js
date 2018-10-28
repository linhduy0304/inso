
import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';
import Communications from 'react-native-communications';
import ItemExclusion from '../../components/buy/ItemExclusion';

class CarClaimGaraOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
        data: [
            {}
        ],
    };
  }

  render() {
    const {data} = this.state;
    return (
		<View style={Css.container}>
            {
                this.props.carClaim.loading ?
                <Loading/>
                : null
            }
            <Nav onPress={() => Actions.pop()} title='Chọn Gara sửa chữa khác'/>
            <ScrollView>
                <View style={{padding: 20}}>
                    <Text style={styles.intro}>Bạn chọn không liên kết với INSO phải có những chứng từ sau:</Text>
                    <Text style={[styles.intro, {fontWeight: 'bold'}]}>aaaa</Text>
                </View>
            </ScrollView>
            <FooterButton>
                <View style={{flexDirection: 'row',width: screen.width - 40, justifyContent: 'space-between'}}>
                    <ButtonNoColor
                        label={'KHÔNG'}
                        width={((screen.width-50)/2)}
                        marginTop={0}
                        backgroundColor='#999'
                        color='#fff'
                        fontSize={16}
                    />
                    <Button
                        label={'ĐỒNG Ý'}
                        width={((screen.width-50)/2)}
                        marginTop={0}
                    />
                </View>
            </FooterButton>
		</View>
    );
  }
}

const styles = StyleSheet.create({
    intro: {
      color: '#333',
    },
    
  })

import {connect} from 'react-redux';
import {getListTargetsByClaimType} from '../../actions/claim';
import { screen } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import ItemRequirement from '../../components/claim/ItemRequirement';
import ButtonNoColor from '../../../components/ButtonNoColor';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListTargetsByClaimType: (body) => dispatch(getListTargetsByClaimType(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimGaraOther);
