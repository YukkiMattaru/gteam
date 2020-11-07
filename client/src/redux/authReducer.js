import {authAPI} from "../api/authAPI";

let initialState = {
    userId: null,
    username: null,
    userType: null,
    isAuth: false
}

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';

let authReducers = (state = initialState, action) => {
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

const setAuthUserData = (userId, username, userType, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {userId, username, userType, isAuth}
})

export const getAuthUserData = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {userId, username, userType} = response.data.data;
        dispatch(setAuthUserData(userId, username, userType, true));
    }
}
