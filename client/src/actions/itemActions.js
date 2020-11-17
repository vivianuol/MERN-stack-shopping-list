 import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
 import axios from 'axios';

 const instance = axios.create({baseURL: 'http://192.168.0.24:3300'})

 
 export const getItems = () => dispatch => {
     dispatch(setItemsLoading());
     instance.get('/api/items').then( res => 
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        })    
    );
 }

 export const addItem = item => dispatch => {
     //dispatch(setItemsLoading());
     instance
        .post('/api/items', item)
        .then(res => {
            console.log("got response...." + JSON.stringify(res.data))
            dispatch({
                type: ADD_ITEM,
                palyload: res.data
            })
        }
        // payload 变成了 palyload, debug两天，完全是浪费生命！吸取教训!
        )
 }

 export const deleteItem = id => dispatch => { 
     
      instance.delete(`/api/items/${id}`).then(res => 
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
        )
 }

 export const setItemsLoading = () => {
     return {
         type: ITEMS_LOADING
     }
 }