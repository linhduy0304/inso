

import auth from './auth';
import carBuy from './carBuy';
import carClaim from './carClaim';
import notify from './notify';
import buy from './buy';
import claim from './claim';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth,
  carBuy,
  notify,
  buy,
  claim,
  carClaim
});

export default rootReducer;