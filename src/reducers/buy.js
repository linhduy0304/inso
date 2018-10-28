

import {
  BUY_REQUEST,
  BUY_SUCCESS,
  BUY_FAIL,
  CONTRACT_INFO_SUCCESS,
  GET_PAY_SUCCESS,
  WEB_PAY_SUCCESS,
  CLOSE_WEB_PAY
} from '../config/types';

const initialState = {
  buy: null,
  loading: null,
  contractInfo: null,
  pays: null,
  webPay: null,
}

export default function buy (state = initialState, action) {
  switch(action.type) {
    case CLOSE_WEB_PAY:
      return {
        ...state,
        webPay: null
      }
    case WEB_PAY_SUCCESS:
      return {
        ...state,
        loading: null,
        webPay: action.data
      }
    case GET_PAY_SUCCESS:
      return {
        ...state,
        loading: null,
        pays: action.data
      }
    case CONTRACT_INFO_SUCCESS:
      return {
        ...state,
        loading: null,
        contractInfo: action.data
      }
    case BUY_REQUEST: 
      return {
        ...state,
        loading: true
      }
    case BUY_SUCCESS:
      return {
        ...state,
        loading: null,
        buy: action.data
      }
    case BUY_FAIL:
      return {
        ...state,
        loading: null,
      }
    default: 
      return state
  }
}