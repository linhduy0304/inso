
import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	StyleSheet,
	Image,
    TouchableOpacity,
    TextInput,
    Picker
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
            cities: [],
            city: '1000018',
            garages: [],
            keyword: '',
            showGara: null,
        };
    }

    componentWillMount = () => {
        var body = {
            function: 'InsoClaimApi_getListCity',
                params: {
                },
            }	
            this.props.getListCity(body)
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.carClaim.cities && this.props.carClaim.cities !== nextProps.carClaim.cities) {
            this.setState({
                cities: nextProps.carClaim.cities
            })
        }
        if(nextProps.carClaim.garages && this.props.carClaim.garages !== nextProps.carClaim.garages) {
            this.setState({
                garages: nextProps.carClaim.garages
            })
        }
    };
    
    search = () => {
        const {keyword, city} = this.state;
        var body = {
            function: 'InsoClaimApi_getListGarage',
                params: {
                    claim_id: 5,
                    city_id: city,
                    keyword
                },
            }	
        this.props.getListGarage(body);
        this.setState({ showGara: true })
    }

    render() {
        const {pick, garages, cities, showGara} = this.state;
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
                                <View style={styles.ctSearch}>
                                    <TextInput
                                        placeholder='Tìm kiếm'
                                        placeholderTextColor='#ccc'
                                        style={{
                                            flex: 1,
                                            
                                        }}
                                        onSubmitEditing={this.search}
                                    />
                                    <TouchableOpacity onPress={this.search}>
                                        <Image style={{ height: 20, width: 20*30/31}} source={require('../../../icons/ic_search.png')}/>
                                    </TouchableOpacity>
                                </View>
                                <View style={{borderBottomWidth: 1, width: (screen.width-60)/2, borderBottomColor: '#d7d7d7' }}>
                                    <Picker
                                        selectedValue={this.state.city}
                                        style={{ height: 50, width: (screen.width-80)/2, }}
                                        onValueChange={(item, index) => this.setState({city: item})}>
                                        {
                                            cities.map((item, index) => {
                                                return (
                                                    <Picker.Item key={index} label={item.name} value={item.id} />
                                                )
                                            })
                                        }
                                    </Picker>
                                </View>
                                
                                <View style={{flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#d7d7d7'}}>
                                    <TouchableOpacity onPress={() => this.setState({pick: 1})} style={styles.ctItemPick}>
                                        <View style={pick === 1 ? styles.ctPickAcitve : styles.ctPick}/>
                                        <Text style={[styles.txtPick, {color: TxtBlack}]}>Garage liên kết với INSO</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({pick: 0})} style={styles.ctItemPick}>
                                        <View style={pick === 0 ? styles.ctPickAcitve : styles.ctPick}/>
                                        <Text style={[styles.txtPick, {color: TxtBlack}]}>Garage khác</Text>
                                    </TouchableOpacity>
                                </View>
                                {
                                    showGara ?
                                        <View>
                                            <Text style={{color: '#333', marginTop: 10}}>Có <Text style={{ color: Color, fontWeight: 'bold'}}>{garages.length} Garage </Text>gần bạn nhất</Text>
                                            {
                                                garages.map((item, index) => {
                                                    return <ItemGara key={index} data={item}/>
                                                })
                                            }
                                        </View>
                                    : null
                                }
                            </View>
                        </View>
                    </ScrollView>
                {/* <FooterButton>
                    <Button
                        label={'TIẾP TỤC'}
                        width={screen.width-40}
                        marginTop={0}
                    />
                </FooterButton> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    ctSearch: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#d7d7d7',
        borderBottomWidth: 1
    },
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
		height: 50
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
import {getListCity, getListGarage} from '../../actions/claim';
import { screen, Color, TxtBlack } from '../../../config/System';
import { Actions } from 'react-native-router-flux';
import ItemGara from '../../components/claim/ItemGara';
import Loading from '../../../components/Loading';

const mapStateToProps = (state) => {
  return {
    carClaim: state.carClaim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getListCity: (body) => dispatch(getListCity(body)),
    getListGarage: (body) => dispatch(getListGarage(body)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarClaimGara);
