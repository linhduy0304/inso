

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from '../config/types';

const initialState = {
  auth: null,
  loading: null,
}

export default function auth (state = initialState, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: null,
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loading: null,
      }
    default: 
      return state
  }
}