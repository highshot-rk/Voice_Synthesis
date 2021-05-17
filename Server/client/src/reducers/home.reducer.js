import { homepageConstants } from '../_constants';

export function homepageContents(state = {resort: []}, action) {
  switch (action.type) {
    case homepageConstants.GET_ALLUSER_REQUEST:
      return {
        loading: true
      };
    case homepageConstants.GET_ALLUSER_SUCCESS:
      return {
        users: action.users.data
      };
    case homepageConstants.GET_ALLUSER_FAILURE:
      return { 
        error: action.error
      };
    case homepageConstants.GET_ALLPAYMENT_REQUEST:
      return {
        loading: true
      };
    case homepageConstants.GET_ALLPAYMENT_SUCCESS:
      return {
        billings: action.billings.data.result
      };
    case homepageConstants.GET_ALLPAYMENT_FAILURE:
      return { 
        error: action.error
      };
    case homepageConstants.GET_ALLHISTORY_REQUEST:
      return {
        loading: true
      };
    case homepageConstants.GET_ALLHISTORY_SUCCESS:
      return {
        cryhistory: action.histories.data.result
      };
    case homepageConstants.GET_ALLHISTORY_FAILURE:
      return { 
        error: action.error
      };
    case homepageConstants.GET_ALLRESORT_REQUEST:
      return {
        loading: true
      };
    case homepageConstants.GET_ALLRESORT_SUCCESS:
      return {
        resort: action.resorts.data.result
      };
    case homepageConstants.GET_ALLRESORT_FAILURE:
      return { 
        error: action.error
      };
    // case homepageConstants.SET_RESORT_REQUEST:
    //   return{
    //     loading: true
    //   };
    case homepageConstants.SET_RESORT:
      return{
        resort: [...state.resort, action.resortD]
      }
    default:
      return state
  }
}