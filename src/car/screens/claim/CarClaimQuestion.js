
import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';

class CarClaimQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount = () => {
    var body = {
      function: 'InsoClaimApi_getListTargetsByClaimType',
      params: {
        claim_type_id: this.props.claim_type_id
      },
    }
    // this.props.getListTargetsByClaimType(body)
  };

  componentWillReceiveProps = (nextProps) => {
    
  };

  send = () => {
	var body = {
		function: 'InsoClaimApi_addClaim',
		params: {
		  claim_type_id: this.props.claim_type_id
		},
	}
	this.props.addClaim(body)
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
		<Nav onPress={() => Actions.pop()} title='Bồi thường xe ô tô'/>
        <View style={{flex: 1,alignItems: 'center', paddingTop: screen.height/6}}>
            <Image style={{width: 100, height: 100}} source={require('../../../icons/ic_question.png')}/>
            <Text style={{ color: '#333', marginVertical: 20 }}>aaa</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between',width: screen.width - 40}}>
                <ButtonNoColor
                    label={'SAI'}
                    width={(screen.width-52)/2}
                    marginTop={10}
                    color='#fff'
                    fontSize={16}
                    backgroundColor='#999999'
                    onPress={() => null}
                />
                <Button
                    label={'ĐÚNG'}
                    width={(screen.width-52)/2}
                    marginTop={10}
                    onPress={() => null}
                />
            </View>
        </View>
		</View>
    );
  }
}

import {connect} from 'react-redux';
import {getListTargetsByClaimType, addClaim} from '../../actions/claim';
import { screen } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import ButtonNoColor from '../../../components/ButtonNoColor';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
	addClaim: (body) => dispatch(addClaim(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimQuestion);
