
import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import FooterButton from '../../../components/FooterButton';
import Css from '../../../config/Css';
import Button from '../../../components/Button';
import Nav from '../../../components/Nav';

class CarClaimGara extends Component {
  constructor(props) {
    super(props);
    this.state = {
		pick: 1,
		gara: [
			{
				name: 'ddd',
				address: 'aaaaa'
			}
		]
    };
  }

  render() {
    const {pick, gara} = this.state;
    return (
		<View style={Css.container}>
            {
                this.props.carClaim.loading ?
                <Loading/>
                : null
            }
            <Nav onPress={() => Actions.pop()} title='Tìm Gara sửa chữa'/>
            	<ScrollView>
					<View style={{padding: 20, flex: 1}}>
						<View style={{flex: 1, backgroundColor: '#fff', padding: 15}}>
							<View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
								<TouchableOpacity onPress={() => this.setState({pick: 1})} style={styles.ctItemPick}>
									<View style={pick === 1 ? styles.ctPickAcitve : styles.ctPick}/>
									<Text style={[styles.txtPick, {color: pick === 1 ? Color : TxtBlack}]}>Garage liên kết với INSO</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => this.setState({pick: 0})} style={styles.ctItemPick}>
									<View style={pick === 0 ? styles.ctPickAcitve : styles.ctPick}/>
									<Text style={[styles.txtPick, {color: pick === 0 ? Color : TxtBlack}]}>Garage khác</Text>
								</TouchableOpacity>
							</View>
							<Text style={{color: '#333'}}>Có gần bạn nhất</Text>
							{
								gara.map((item, index) => {
									return <ItemGara key={index} data={item}/>
								})
							}
						</View>
                	</View>
            	</ScrollView>
            <FooterButton>
                <Button
                    label={'GỬI'}
                    width={screen.width-40}
                    marginTop={0}
                />
            </FooterButton>
		</View>
    );
  }
}

const styles = StyleSheet.create({
    intro: {
      	color: '#333',
	},
	ctPick: {
		height: 16,
		width: 16,
		borderRadius: 8,
		backgroundColor: '#ccc',
		marginRight: 5,
	  },
    txtPick: {
		fontSize: 12
	  },
	  ctItemPick: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 10,
		paddingBottom: 10
	  },
	  ctPickAcitve: {
		height: 16,
		width: 16,
		borderRadius: 8,
		borderWidth: 5,
		borderColor: Color,
		backgroundColor: '#fff',
		marginRight: 5
	  },
  })

import {connect} from 'react-redux';
import {getListTargetsByClaimType} from '../../actions/claim';
import { screen, Color, TxtBlack } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import ItemRequirement from '../../components/claim/ItemRequirement';
import ButtonNoColor from '../../../components/ButtonNoColor';
import ItemGara from '../../components/claim/ItemGara';

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

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimGara);
