import * as axios from "axios";
import sha256 from "crypto-js/sha256";
import base64 from "crypto-js/enc-base64";

export const authAPI = {
    login(userName, password) {
        let hashPassword = sha256(password).toString(base64);
        return axios
            .get(`users/1?userName=${userName}&hashPassword=${hashPassword}`)
    }
}