import * as axios from 'axios';
import sha256 from 'crypto-js/sha256';
import base64 from 'crypto-js/enc-base64'

export const registerAPI = {
    register (formData) {
        let hashPassword = sha256(formData.password).toString(base64);
        return axios
            .post('users', { userName: formData.userName, hashPassword, userType: formData.userType,
            fullName: formData.fullName, companyName: formData.companyName, location: formData.location,
            phone: formData.phone, email: formData.email})
    }
}