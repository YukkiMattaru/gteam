import {authAPI} from "../api/authAPI";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'

let initialState = {
    userID: null,
    userName: null,
    isAuth: false
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

const setAuthUserData = (userID, userName, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userID, userName, isAuth}
})

export const loginThunk = (userName, password) => async (dispatch) => {
    debugger;
    let response = await authAPI.login(userName, password)
    debugger;
    if (response.data.resultCode === 0) {
        debugger;
        dispatch(setAuthUserData(response.data.body.item._id, response.data.body.item.userName, true))
    } else {
        let message = response.message ? response.message : "Some Error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export default authReducer;