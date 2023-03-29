import axios from "axios";
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_FAIL,
    REGISTER_USER_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_FAIL,
    LOAD_USER_SUCCESS,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_DETAILS_SUCCESS,
    CLEAR_ERRORS
} from "../constants/userConstants";

// const baseUrl = 'http://localhost:5000';
const baseUrl = '';
//login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const data = await axios.post(
            `${baseUrl}/login`,
            { email, password },
            config
        );

        dispatch({ type: LOGIN_SUCCESS, payload: data })
    } catch (error) {
        // dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
        dispatch({ type: LOGIN_FAIL, payload: error });
    }
}

//Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.post(`${baseUrl}/register`, userData, config);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
    } catch (error) {
        // dispatch({ type: REGISTER_USER_FAIL, payload: error });
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
    }
}

//load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const data = await axios.get(`${baseUrl}/me`);

        dispatch({ type: LOAD_USER_SUCCESS, payload: data })
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
}

//Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put(`${baseUrl}/update`, passwords, config);

        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
    } catch (error) {
        // dispatch({ type: REGISTER_USER_FAIL, payload: error });
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
    }
}

//Get User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
        const { data } = await axios.get(`${baseUrl}/user/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message })
    }
}


//Clearing all errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}