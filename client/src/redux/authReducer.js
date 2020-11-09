import {authAPI} from "../api/authAPI";
import {stopSubmit} from "redux-form";
import cookies from "js-cookie";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const SET_SESSION_ID = 'auth/SET_SESSION_ID'

let initialState = {
    userName: null,
    userType: null,
    isAuth: false,
    sessID: null
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

const setAuthUserData = (userName, userType, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userName, userType, isAuth}
})

export const loginThunk = (userName, password) => async (dispatch) => {
    let response = await authAPI.login(userName, password);
    if (response.data.resultCode === 0) {
        let sessID = cookies.get('sessID')
        dispatch(setSessionID(sessID));
        debugger;
        dispatch(getUserData());
        debugger;
    }
}

export const getUserData = () => async (dispatch) => {
    let response = await authAPI.me();
    debugger;
    if (response.data.resultCode === 0) {
        debugger;
        dispatch(setAuthUserData(response.data.body.userName, response.data.body.userType, true))
    }
}

/*
if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(response.data.body.item._id, response.data.body.item.userName, true, null))
} else {
    let message = response.body.body.message ? response.body.body.message : "Some Error";
    dispatch(stopSubmit("login", {_error: message}));
}*/

export default authReducer;