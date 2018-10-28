

import {
  CAR_PRODUCER_SUCCESS,
  CAR_MODEL_SUCCESS,
  CAR_GET_PRICE_SUCCESS,
  CAR_CHECK_PRICE_SUCCESSS,
  CAR_CHECK_PRICE_FAIL,
  CAR_YEAR_SUCCESS,
  CAR_PACKAGE_REQUEST,
  CAR_PACKAGE_SUCCESS,
  CAR_PACKAGE_FAIL,
  CAR_REQUIREMENT_SUCCESS,
  CAR_SEAT_SUCCESS,
  CAR_UPDATE_IMAGE,
  ADD_PRICE,
  SET_PRICE,
  GET_PROFILE_SUCCESS,
  CAR_REQUEST,
  CAR_FAIL,
  SET_PRODUCER,
  CAR_CHECK_PRICE_REQUEST,
  SAVE_CONTRACT_SUCCESS,
  CLOSE_CONTRACT_SUCCESS,
  CLOSE_PACKAGE_NULL,
  OPEN_CHANGE_FEE,
  CAR_SET_PROFILE_ID,
  CAR_EXCLUSION_SUCCESS,
  CAR_SET_PATH_CORNER,
  CAR_MODAL_CHECK_PRICE,
  CAR_REQUIREMENT_REQUEST
} from '../config/types';

const initialState = {
  loading: null,
  producer: [],
  models: [],
  years: [],
  seats: [],
  price: null,
  priceSuggest: null,
  showModalCheckPrice: null,
  package: null,
  requirements: null,
  fields: {},
  paths: {},
  total: 0,
  profile: {},
  showContractSuccess: null,
  showPackageNull: null,
  showChangeFee: null,
  profile_id: null,
  exclusions: null
}

export default function carBuy (state = initialState, action) {
  switch(action.type) {
    case CAR_EXCLUSION_SUCCESS:
      return {
        ...state,
        exclusions: action.data
      }
    case CAR_SET_PROFILE_ID:
      return {
        ...state,
        profile_id: action.data
      }
    case OPEN_CHANGE_FEE:
      return {
        ...state,
        showChangeFee: true,
      }
    case CLOSE_PACKAGE_NULL: 
      return {
        ...state,
        showPackageNull: null
      }
    case CLOSE_CONTRACT_SUCCESS:
      return {
        ...state,
        showContractSuccess: null
      }
    case SAVE_CONTRACT_SUCCESS: 
      return {
        ...state,
        showContractSuccess: true
      }
    case SET_PRODUCER: 
      switch(action.action) {
        case 'producer':
          return {
            ...state,
            years: [],
            seats: [],
            models: []
          }
        case 'year':
          return {
            ...state,
            seats: [],
            models: []
          }
        case 'model':
          return {
            ...state,
            seats: [],
          }
        default: 
          return
      }
     
    case CAR_FAIL:
      return {
        ...state,
        loading: null,
      }

    case CAR_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case GET_PROFILE_SUCCESS:
      var profile = state.profile;
      switch(action.code) {
        case 'FORM_REGISTRATION_CERTIFICATE_CAR':
          profile['registration'] = action.data
          return {
            ...state,
            profile
          }
        case 'FORM_CERTIFICATE_CAR':
          profile['certificate'] = action.data
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
        default:
          return {
            ...state,
          }
      }
      
    case SET_PRICE:
      return {
        ...state,
        total: action.price
      }

    case ADD_PRICE:
      var total = state.total;
      total = total + action.price
      return {
        ...state,
        total: total
      }
    case CAR_SET_PATH_CORNER:
      return {
        ...state,
        paths: {}
      }

    case CAR_UPDATE_IMAGE:
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
      
    case CAR_REQUIREMENT_REQUEST:
      return {
        ...state,
        requirements: null
      }
    case CAR_REQUIREMENT_SUCCESS:
      return {
        ...state,
        requirements: action.data
      }
    case CAR_PACKAGE_REQUEST:
      return {
        ...state,
        package: null,
        loading: true
      }
    case CAR_PACKAGE_SUCCESS:
      return {
        ...state,
        package: action.data,
        loading: null
      }
    case CAR_PACKAGE_FAIL:
      return {
        ...state,
        showPackageNull: true,
        loading: null
      }
    case CAR_YEAR_SUCCESS:
      return {
        ...state,
        years: action.data
      }

    case CAR_MODAL_CHECK_PRICE:
      return {
        ...state,
        showModalCheckPrice: action.data,
      }
    case CAR_CHECK_PRICE_REQUEST:
      return {
        ...state,
        total: 0,
        showModalCheckPrice: null,
      }
    case CAR_CHECK_PRICE_SUCCESSS:
      return {
        ...state,
        showModalCheckPrice: null,
        price: action.data
      }
    case CAR_CHECK_PRICE_FAIL:
      return {
        ...state,
        loading: null,
        showModalCheckPrice: true,
        priceSuggest: action.data
      }

    case CAR_GET_PRICE_SUCCESS:
      return {
        ...state,
        loading: null,
        carPrice: action.data,
        showChangeFee: null,
      }

    case CAR_SEAT_SUCCESS:
      return {
        ...state,
        seats: action.data
      }

    case CAR_MODEL_SUCCESS:
      return {
        ...state,
        models: action.data
      }

    case CAR_PRODUCER_SUCCESS:
      return {
        ...state,
        producer: action.data
      }
    default: 
      return state
  }
}