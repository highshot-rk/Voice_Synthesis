import { authHeader, config } from '../_helpers';
import axios from 'axios';
export const homeService = {
    getAllUsers,
    getAllPayments,
    getAllHistories,
    getAllResorts
};

function getAllUsers(){
    return axios.get(`http://192.168.110.111:8000/api/Members`, { headers: authHeader() })
        .then(
            users => {
                return users;
            }
        )
        .catch(err => {
            console.log(err);
        })
}

function getAllPayments(){
    return axios.get(`http://192.168.110.111:8000/api/Billings/BillingUsers`, { headers: authHeader() })
        .then(
            billings => {
                return billings;
            }
        )
        .catch(err => {
            console.log(err);
        })
}

function getAllHistories(){
    return axios.get(`http://192.168.110.111:8000/api/CryHistories/CryHistoryUsers`, { headers: authHeader() })
        .then(
            billings => {
                return billings;
            }
        )
        .catch(err => {
            console.log(err);
        })
}

function getAllResorts(){
    return axios.get(`http://192.168.110.111:8000/api/Resorts/ResortUsers`, { headers: authHeader() })
        .then(
            resorts => {
                return resorts;
            }
        )
        .catch(err => {
            console.log(err);
        })
}