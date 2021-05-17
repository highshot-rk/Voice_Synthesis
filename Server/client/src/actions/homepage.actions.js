import { homepageConstants } from '../_constants';
import { homeService } from '../_services';

export const homepageActions = {
    getAllUsers,
    getAllPayments,
    getAllHistories,
    getAllResorts,
    setResort
};
function getAllUsers(){
    return dispatch => {
        dispatch(request());

        homeService.getAllUsers()
            .then(
                users => {
                    dispatch(success(users))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: homepageConstants.GET_ALLUSER_REQUEST } }
    function success(users) { return { type: homepageConstants.GET_ALLUSER_SUCCESS, users } }
    function failure(error) { return { type: homepageConstants.GET_ALLUSER_FAILURE, error } }
}

function getAllPayments(){
    return dispatch => {
        dispatch(request());

        homeService.getAllPayments()
            .then(
                billings => {
                    dispatch(success(billings))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: homepageConstants.GET_ALLPAYMENT_REQUEST } }
    function success(billings) { return { type: homepageConstants.GET_ALLPAYMENT_SUCCESS, billings } }
    function failure(error) { return { type: homepageConstants.GET_ALLPAYMENT_FAILURE, error } }
}

function getAllHistories(){
    return dispatch => {
        dispatch(request());

        homeService.getAllHistories()
            .then(
                histories => {
                    dispatch(success(histories))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: homepageConstants.GET_ALLHISTORY_REQUEST } }
    function success(histories) { return { type: homepageConstants.GET_ALLHISTORY_SUCCESS, histories } }
    function failure(error) { return { type: homepageConstants.GET_ALLHISTORY_FAILURE, error } }
}

function getAllResorts(){
    return dispatch => {
        dispatch(request());

        homeService.getAllResorts()
            .then(
                resorts => {
                    dispatch(success(resorts))
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: homepageConstants.GET_ALLRESORT_REQUEST } }
    function success(resorts) { return { type: homepageConstants.GET_ALLRESORT_SUCCESS, resorts } }
    function failure(error) { return { type: homepageConstants.GET_ALLRESORT_FAILURE, error } }
}

function setResort(resortitem){
    let resortD = {};
    resortD = resortitem.data.result.resort;
    resortD.member = resortitem.data.result.member
    return {type: homepageConstants.SET_RESORT, resortD}
}