import * as axios from 'axios';
import sha256 from 'crypto-js/sha256';
import base64 from 'crypto-js/enc-base64'

export const registerAPI = {
    register (userName, password, userType) {
        let hashPassword = sha256(password).toString(base64);
        return axios
            .post('users', { userName, hashPassword, userType })
    }
}