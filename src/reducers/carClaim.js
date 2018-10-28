

import {
	CLAIM_TARGET_SUCCESS,
	CAR_CLAIM_REQUIREMENT_SUCCESS
} from '../config/types';

const initialState = {
	loading: null,
	targets: null,
	requirements: null,
}

export default function carBuy (state = initialState, action) {
	switch(action.type) {
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