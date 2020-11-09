import {authAPI} from "../api/authAPI";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'

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
        default:
            return state;
    }
}

const setAuthUserData = (userName, userType, isAuth, sessID) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userName, userType, isAuth, sessID}
})

export const loginThunk = (userName, password) => async (dispatch) => {
    debugger;
    let response = await authAPI.login(userName, password)
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.body.item._id, response.data.body.item.userName, true))
    } else {
        let message = response.body.body.message ? response.body.body.message : "Some Error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export default authReducer;