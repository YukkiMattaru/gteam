import {stopSubmit} from "redux-form";
import {registerAPI} from "../api/registerAPI";

export const registerThunk = (userName, password, userType) => async (dispatch) => {
    let response = await registerAPI.register(userName, password, userType)
    if (response.data.resultCode === 0) {
        alert('Yes!')
    } else {
        let message = response.message ? response.message : "Some Error";
        dispatch(stopSubmit("register", {_error: message}));
    }
}