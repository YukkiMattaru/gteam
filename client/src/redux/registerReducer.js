import {stopSubmit} from "redux-form";
import {registerAPI} from "../api/registerAPI";
import {loginThunk} from "./authReducer";

export const registerThunk = (formData) => async (dispatch) => {
    let response = await registerAPI.register(formData)
    if (response.data.resultCode === 0) {
        dispatch(loginThunk(formData.userName, formData.password));
    } else {
        let message = response.message ? response.message : "Some Error";
        dispatch(stopSubmit("register", {_error: message}));
    }
}