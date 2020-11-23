import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING
} from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import axios from 'axios';

const instance = axios.create({ baseURL: 'http://192.168.0.24:3300' })


export const getItems = () => (dispatch, getState) => {
    dispatch(setItemsLoading());
    instance
        .get('/api/items', tokenConfig(getState))
        .then(res =>
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })

        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

export const addItem = item => (dispatch, getState) => {

    instance
        .post('/api/items', item, tokenConfig(getState))
        .then(res => {
            console.log("got response...." + JSON.stringify(res.data))
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        }
            // payload 变成了 palyload, debug两天，完全是浪费生命！吸取教训!
        )
        .catch(err =>
            dispatch(returnErrors(err.response.data, err.response.status))
        );
}

export const deleteItem = id => (dispatch, getState) => {

    instance
        .delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err => 
            dispatch(returnErrors(err.response.data, err.response.status))
            );
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}