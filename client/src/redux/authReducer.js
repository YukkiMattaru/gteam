import {authAPI} from "../api/authAPI";
import {stopSubmit} from "redux-form";
import cookies from "js-cookie";
import {countersThunk} from "./countersReducer";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const SET_SESSION_ID = 'auth/SET_SESSION_ID'
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING'

let initialState = {
    userName: null,
    userType: null,
    isAuth: false,
    sessID: null,
    isFetching: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
        case SET_SESSION_ID:
            return {
                ...state,
                ...action.payload
            }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

const setSessionID = (sessID) => ({
    type: SET_SESSION_ID,
    payload: {
        sessID
    }
})

const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching})

const setAuthUserData = (userName, userType, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userName, userType, isAuth}
})

export const loginThunk = (userName, password) => async (dispatch) => {
    let response = await authAPI.login(userName, password);
    if (response.data.resultCode === 0) {
        let sessID = cookies.get('sessID')
        dispatch(setSessionID(sessID));
        dispatch(getUserData())
    }
}

export const logoutThunk = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        let sessID = null;
        dispatch(setSessionID(sessID));
        dispatch(setAuthUserData(null, null, false))
    }
}

export const getUserData = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.body.item.userName, response.data.body.item.userType, true))
        dispatch(countersThunk())
    }
    dispatch(toggleIsFetching(false));
}

export default authReducer;