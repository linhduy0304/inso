

import {
	CLAIM_TARGET_SUCCESS,
	CAR_CLAIM_REQUIREMENT_SUCCESS,
	CAR_CLAIM_CITY_SUCCESS,
	CAR_CLAIM_GARAGE_SUCCESS,
	CAR_CLAIM_GET_PROFILE_SUCCESS,
	CAR_CLAIM_LIST_TYPE_SUCCESS,
	CAR_CLAIM_UPDATE_IMAGE,
	CAR_CLAIM_SET_PATH_CORNER,
	CAR_CLAIM_MODAL_REQUIREMENT,
	CAR_CLAIM_CONTRACT_SUCCESS,
	CAR_CLAIM_REQUEST,
	CAR_CLAIM_FAIL,
	CAR_CLAIM_MODAL_BOOK_GARA
} from '../config/types';

const initialState = {
	listType: null,
	loading: null,
	targets: null,
	requirements: null,
	cities: null,
	garages: null,
	contractInfo: null,

	modalRequirement: null,
	modalBookGara: null,

	profile: {},
	fields: {},
  	paths: {},
}

export default function carBuy (state = initialState, action) {
	switch(action.type) {
		case CAR_CLAIM_MODAL_BOOK_GARA:
			return {
				...state,
				modalBookGara: action.data
			}
		case CAR_CLAIM_REQUEST:
			return {
				...state,
				loading: true
			}
		case CAR_CLAIM_FAIL:
			return {
				...state,
				loading: null
			}
		case CAR_CLAIM_CONTRACT_SUCCESS:
			return {
				...state,
				contractInfo: action.data
			}
		case CAR_CLAIM_MODAL_REQUIREMENT:
			return {
				...state,
				modalRequirement: action.data
			}
			
		case CAR_CLAIM_SET_PATH_CORNER:
			return {
				...state,
				paths: action.data
			}
	  
		case CAR_CLAIM_UPDATE_IMAGE:
			switch(action.action) {
				case 'FORM_IMAGE_CAR':
				var profile = state.profile;
				var paths = state.paths;
				var fields = state.fields;
				fields[action.data.name] = action.data.value
				switch(action.data.name) {
					case "IMAGE_1":
						profile.corner.IMAGE_1.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_2":
						profile.corner.IMAGE_2.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_3":
						profile.corner.IMAGE_3.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_4":
						profile.corner.IMAGE_4.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					case "IMAGE_5":
						profile.corner.IMAGE_5.value = action.data.value
						paths[action.data.name] = action.data.path
						return {
							...state,
							profile,
							paths,
						}
					default:
						return {
						...state
						}
				}
				case 'FORM_CERTIFICATE_CAR':
					var profile = state.profile;
					profile.certificate.IMAGE.value = action.data
					return {
						...state,
						profile,
					}
				case 'FORM_REGISTRATION_CERTIFICATE_CAR':
					var profile = state.profile;
					profile.registration.IMAGE.value = action.data
					return {
						...state,
						profile,
					}
				default:
					return {
						...state
					}
		}
	  

		case CAR_CLAIM_LIST_TYPE_SUCCESS:
			return {
				...state,
				listType: action.data
			}
		case CAR_CLAIM_GET_PROFILE_SUCCESS:
			var profile = state.profile;
			switch(action.code) {
				case 'FORM_DRIVER_LICENSE':
					profile['driver'] = action.data
					return {
						...state,
						profile
					}
				case 'FORM_IMAGE_DAMAGE':
					profile['damage'] = action.data
					return {
						...state,
						profile
					}
				case 'FORM_IMAGE_CAR':
					profile['corner'] = action.data
					return {
						...state,
						profile
					}
				case 'FORM_IMAGE_SCENE':
					profile['scene'] = action.data
					return {
						...state,
						profile
					}
				default:
					return {
						...state,
					}
			}

		case CAR_CLAIM_GARAGE_SUCCESS:
			return {
				...state,
				garages: action.data
			}
		case CAR_CLAIM_CITY_SUCCESS:
			return {
				...state,
				cities: action.data
			}
		case CLAIM_TARGET_SUCCESS:
			return {
				...state,
				targets: action.data
			}
		case CAR_CLAIM_REQUIREMENT_SUCCESS:
			return {
				...state,
				requirements: action.data
			}

	
		default: 
		return state
	}
}