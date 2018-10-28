
import React, { Component } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';
import FormCamera from '../../components/claim/FormCamera';

class CarClaimRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount = () => {
    // var body = {
    //   function: 'InsoClaimApi_getListTargetsByClaimType',
    //   params: {
    //     claim_type_id: this.props.claim_type_id
    //   },
    // }
    // this.props.getListTargetsByClaimType(body)
  };

//   componentWillReceiveProps = (nextProps) => {
//     if(nextProps.carClaim.targets && this.props.carClaim.targets != nextProps.carClaim.targets) {
//       this.setState({
//         data: nextProps.carClaim.targets
//       })
//     }
//   };

  render() {
    const {data} = this.state;
    return (
		<View style={Css.container}>
		{
			this.props.carClaim.loading ?
			<Loading/>
			: null
		}
		<Nav onPress={() => Actions.pop()} title='Chụp bằng lái xe'/>
        <View style={{flex: 1, padding: 20,}}>
            <FormCamera/>
            <Text style={{color: '#333', fontSize: 16, textAlign: 'center', marginTop: 15}}>Bạn vui lòng chụp ảnh bằng lái xe của bạn</Text>
        </View>
		<FooterButton>
			<Button
				label={'GỬI'}
				width={(screen.width-40)}
				marginTop={0}
				onPress={() => this.send()}
			/>
		</FooterButton>
		</View>
    );
  }
}

import {connect} from 'react-redux';
import {addClaim} from '../../actions/claim';
import { screen } from '../../../config/System';
import { Actions } from 'react-native-router-flux';

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

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimRegistration);
