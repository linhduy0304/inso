

import React, { Component } from 'react';

import {Router, Stack, Scene} from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

import Tab from './screens/tab/Tab';
import Login from './screens/auth/Login';
import CarPackage from './car/screens/buy/CarPackage';
import CarProducer from './car/screens/buy/CarProducer';
import CarPrice from './car/screens/buy/CarPrice';
import CarRequirement from './car/screens/buy/CarRequirement';
import CarUpdateInfo from './car/screens/buy/CarUpdateInfo';
import CarCorner from './car/screens/buy/CarCorner';
import Register from './screens/auth/Register';
import RegisterSuccess from './screens/auth/RegisterSuccess';
import TakePhoto from './car/screens/buy/TakePhoto';
import CarRegistration from './car/screens/buy/CarRegistration';
import CarExclusion from './car/screens/buy/CarExclusion';
import CarPriceExclusion from './car/screens/buy/CarPriceExclusion';
import CarCertificate from './car/screens/buy/CarCertificate';
import Notify from './screens/Notify';
import PayList from './screens/pay/PayList';
import App from './screens/App';
import ContractInfo from './screens/contract/ContractInfo';
import TakePhotoAgain from './car/screens/buy/TakePhotoAgain';
import PaySuccess from './screens/pay/PaySuccess';

import CarClaimPick from './car/screens/claim/CarClaimPick';
import CarClaimRequirement from './car/screens/claim/CarClaimRequirement';
import CarClaimDamage from './car/screens/claim/CarClaimDamage';
import CarClaimCalendar from './car/screens/claim/CarClaimCalendar';
import CarClaimGaraOther from './car/screens/claim/CarClaimGaraOther';
import CarClaimGara from './car/screens/claim/CarClaimGara';
import CarClaimQuestion from './car/screens/claim/CarClaimQuestion';
import CarClaimRegistration from './car/screens/claim/CarClaimRegistration';
import CarClaimList from './car/screens/claim/CarClaimList';
import ContractClaim from './screens/contract/ContractClaim';
import CarClaimCorner from './car/screens/claim/CarClaimCorner';

const store = createStore(reducer, applyMiddleware(thunk)) 

const Root = () => (
  <Provider store = {store}>
    <Router>
      <Stack key="root">
        <Scene key="app" hideNavBar={true} component={App}/>
        <Scene key="login" hideNavBar={true} component={Login}/>
        <Scene key="register" hideNavBar={true} component={Register}/>
        <Scene key="registerSuccess" hideNavBar={true} component={RegisterSuccess}/>
        <Scene key="tab" hideNavBar={true} component={Tab}/>

        <Scene key="carProducer"  hideNavBar={true} component={CarProducer}/>
        <Scene key="carPrice" hideNavBar={true} component={CarPrice}/>
        <Scene key="carPackage" hideNavBar={true} component={CarPackage}/>
        <Scene key="carRequirement" hideNavBar={true} component={CarRequirement}/>
        <Scene key="carUpdateInfo" hideNavBar={true} component={CarUpdateInfo}/>
        <Scene key="carCorner" hideNavBar={true} component={CarCorner}/>
        <Scene key="takePhoto" hideNavBar={true} component={TakePhoto}/>
        <Scene key="takePhotoAgain" hideNavBar={true} component={TakePhotoAgain}/>
        <Scene key="carRegistration"  hideNavBar={true} component={CarRegistration}/>
        <Scene key="carCertificate" hideNavBar={true} component={CarCertificate}/>
        <Scene key="carExclusion" hideNavBar={true} component={CarExclusion}/>
        <Scene key="carPriceExclusion" hideNavBar={true} component={CarPriceExclusion}/>

        <Scene key="carClaimList" hideNavBar={true} component={CarClaimList}/>
        <Scene key="carClaimPick" hideNavBar={true} component={CarClaimPick}/>
        <Scene key="carClaimRequirement" initial={true} hideNavBar={true} component={CarClaimRequirement}/>
        <Scene key="carClaimDamage" hideNavBar={true} component={CarClaimDamage}/>
        <Scene key="carClaimCalendar"  hideNavBar={true} component={CarClaimCalendar}/>
        <Scene key="carClaimGaraOther" hideNavBar={true} component={CarClaimGaraOther}/>
        <Scene key="carClaimGara"  hideNavBar={true} component={CarClaimGara}/>
        <Scene key="carClaimQuestion"  hideNavBar={true} component={CarClaimQuestion}/>
        <Scene key="carClaimRegistration" hideNavBar={true} component={CarClaimRegistration}/>
        <Scene key="carClaimCorner" initial={true} hideNavBar={true} component={CarClaimCorner}/>

        <Scene key="contractInfo" hideNavBar={true} component={ContractInfo}/>
        <Scene key="contractClaim"  hideNavBar={true} component={ContractClaim}/>
        
        <Scene key="notify" hideNavBar={true} component={Notify}/>
        <Scene key="payList" hideNavBar={true} component={PayList}/>
        <Scene key="paySuccess" hideNavBar={true} component={PaySuccess}/>
      </Stack>
    </Router>
  </Provider>
);

export default Root;
