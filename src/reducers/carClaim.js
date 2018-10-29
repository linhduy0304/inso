

import {
	CLAIM_TARGET_SUCCESS,
	CAR_CLAIM_REQUIREMENT_SUCCESS,
	CAR_CLAIM_CITY_SUCCESS,
	CAR_CLAIM_GARAGE_SUCCESS
} from '../config/types';

const initialState = {
	loading: null,
	targets: null,
	requirements: null,
	cities: null,
	garages: null,
}

export default function carBuy (state = initialState, action) {
	switch(action.type) {
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