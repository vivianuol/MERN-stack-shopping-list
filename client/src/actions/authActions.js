import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ITEMS_LOADING
} from "./types";
import {returnErrors} from './errorActions';
import axios from 'axios';

const instance = axios.create({baseURL: 'http://192.168.0.25:3300'})

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: USER_LOADING} );
    
    instance.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

// Register User
export const register = ({ name, email, password }) => dispatch => {
     
    // Set header
     const config = {
         headers: {
             "Content-Type": 'application/json'
         }
     }

     // Request body
     const body = JSON.stringify({ name, email, password });

     instance.post('/api/users/register', body, config)
        .then( res => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'))
            dispatch({
                type: REGISTER_FAIL
            })
        })
}

// Login User
export const login = ({ email, password}) => dispatch => {
    // Set header
    const config = {
        headers: {
            "Content-Type": 'application/json'
        }
    }

    // Request body
    const body = JSON.stringify({ email, password });

    instance.post('/api/auth/login', body, config)
       .then( async (res) => {
           await dispatch({
               type: LOGIN_SUCCESS,
               payload: res.data
           })
           dispatch(loadUser());
       })
       .catch(err => {
           dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'))
           dispatch({
               type: LOGIN_FAIL
           })
       })
}


// Logout User
export const logout  = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

// Setup config/header & token
export const tokenConfig = getState => {
     // Get token from localstorage
     const token = getState().auth.token;
     //console.log("----->" + token)

     // Headers
     const config = {
         headers: {
             "Content-type": "application/json"
         }
     }
 
     // If token, add to header
     if (token) {
         config.headers['x-auth-token'] = token;
     }

     //console.log(JSON.stringify(config))

     return config;

}