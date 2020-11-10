import {stopSubmit} from "redux-form";
import {registerAPI} from "../api/registerAPI";
import {loginThunk} from "./authReducer";

export const registerThunk = (userName, password, userType) => async (dispatch) => {
    let response = await registerAPI.register(userName, password, userType)
    if (response.data.resultCode === 0) {
        dispatch(loginThunk(userName, password));
    } else {
        let message = response.message ? response.message : "Some Error";
        dispatch(stopSubmit("register", {_error: message}));
    }
}