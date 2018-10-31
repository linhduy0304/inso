

import {
	CLAIM_TARGET_SUCCESS,
	CAR_CLAIM_REQUIREMENT_SUCCESS,
	CAR_CLAIM_CITY_SUCCESS,
	CAR_CLAIM_GARAGE_SUCCESS,
	CAR_CLAIM_GET_PROFILE_SUCCESS,
	CAR_CLAIM_LIST_TYPE_SUCCESS
} from '../config/types';

const initialState = {
	listType: null,
	loading: null,
	targets: null,
	requirements: null,
	cities: null,
	garages: null,

	profile: {}
}

export default function carBuy (state = initialState, action) {
	switch(action.type) {
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