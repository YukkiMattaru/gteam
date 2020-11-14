import {authAPI} from "../api/authAPI";
import {stopSubmit} from "redux-form";
import cookies from "js-cookie";
import {countersThunk, setUserCounters} from "./countersReducer";
import {certificatesThunk} from "./certificatesReducer";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA'
const SET_SESSION_ID = 'auth/SET_SESSION_ID'
const TOGGLE_IS_FETCHING = 'auth/TOGGLE_IS_FETCHING'

let initialState = {
    userName: null,
    userType: null,
    isAuth: false,
    sessID: null,
    isFetching: false,
    totalCountersValue: 0,
    userInfo: {
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
        location: ""
    }
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

const setAuthUserData = (userData, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: {
        userName: userData.userName,
        userType: userData.userType,
        totalCountersValue: userData.totalCounters,
        isAuth,
        userInfo: {
            fullName: userData.userInfo.fullName,
            companyName: userData.userInfo.companyName,
            phone: userData.userInfo.phone,
            location: userData.userInfo.location,
            email: userData.userInfo.email,
        }
    }
})

export const loginThunk = (userName, password) => async (dispatch) => {
    let response = await authAPI.login(userName, password);
    if (response.data.resultCode === 0) {
        let sessID = cookies.get('sessID')
        dispatch(setSessionID(sessID));
        dispatch(getUserData())
    }
    else alert(response.data.body.message);
}

export const logoutThunk = () => async (dispatch) => {
    let response = await authAPI.logout();
    if (response.data.resultCode === 0) {
        let sessID = null;
        dispatch(setSessionID(sessID));
        dispatch(setAuthUserData({
            userName: null,
            userType: null,
            totalCountersValue: null,
            userInfo: {
                fullName: null,
                companyName: null,
                phone: null,
                location: null,
                email: null
            }
        }, false))
        dispatch(setUserCounters([]))
    }
}

export const infoThunk = (info) => async (dispatch) => {
    let newUserInfo = {
        fullName: info.fullName,
        companyName: info.companyName,
        location: info.location,
        phone: info.phone,
        email: info.email,
    }
    let response = await authAPI.updateInfo(newUserInfo);
    if (response.data.resultCode === 0) {
        dispatch(getUserData())
    }
}

export const getUserData = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(response.data.body, true))
        dispatch(countersThunk())
        dispatch(certificatesThunk())
    }
    dispatch(toggleIsFetching(false));
}

export default authReducer;