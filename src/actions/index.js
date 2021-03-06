import axios from 'axios';
import { keys } from '../config/keys';
import { database, firebaseApp } from '../firebase';
import _ from 'lodash';

export const FETCH_FOOD = 'FETCH_FOOD';
export const SIGN_IN = 'SIGN_IN';
export const FETCH_TO_TABLE = 'FETCH_TO_TABLE';
export const DELETE_FROM_TABLE = 'DELETE_FROM_TABLE';
export const FETCH_USERS_DATA = 'FETCH_USERS_DATA';

export function fetchFood(foodName) {
    const requestData = axios({
        method: 'get',
        url: `https://nutritionix-api.p.mashape.com/v1_1/search/${foodName}?fields=nf_calories,item_name,brand_name,nf_serving_weight_grams,nf_total_fat,nf_sugars,nf_protein`,
        headers: {
            'X-Mashape-Key': keys.apiKeys.mashedApiKey
        }
    }).then(function(response) {
        return response.data.hits;
    });
    return { type: FETCH_FOOD, payload: requestData };
}

export function logUser(userId) {
    return { type: SIGN_IN, payload: userId };
}

export function fetchToTabel(foodItem) {
    return { type: FETCH_TO_TABLE, payload: foodItem };
}

export function deleteFromTable(index) {
    return { type: DELETE_FROM_TABLE, index };
}

export function fetchUsersData(date) {
    const firebaseUser = firebaseApp.auth().currentUser;
    return dispatch => {
        database
            .ref(`users/${firebaseUser.uid}/${date}`)
            .once('value', snapshot => {
                if (_.isNull(snapshot.val())) {
                    console.log('is NUll validation');
                    return;
                }
                return dispatch({
                    type: FETCH_USERS_DATA,
                    payload: snapshot.val().tableFood
                });
            });
    };
    // return { type: FETCH_USERS_DATA, payload:  };
}
