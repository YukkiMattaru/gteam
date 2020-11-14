import {certificatesAPI} from "../api/certificatesAPI";

const SET_USER_CERTIFICATES = 'certificates/SET_USER_CERTIFICATES'

let initialState = {}

const certificatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_CERTIFICATES:
            return action.payload
        default:
            return state;
    }
}

export const setUserCertificates = (certificates) => {
    return ({
        type: SET_USER_CERTIFICATES,
        payload: certificates
    })
}

export const certificatesThunk = () => async (dispatch) => {
    let response = await certificatesAPI.getAllUserCertificates();
    if (response.data.resultCode === 0) {
        dispatch(setUserCertificates(response.data.body.certificates))
    }
}

export const deleteCertificateThunk = (id) => async (dispatch) => {
    let response = await certificatesAPI.deleteCertificate(id)
    if (response.data.resultCode === 0) {
        dispatch(certificatesThunk());
    }
}

export default certificatesReducer;