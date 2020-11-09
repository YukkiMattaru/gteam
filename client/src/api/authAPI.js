import * as axios from "axios";
import sha256 from "crypto-js/sha256";
import base64 from "crypto-js/enc-base64";

const withCookies = axios.create({
    withCredentials: true
});

export const authAPI = {
    login(userName, password) {
        let hashPassword = sha256(password).toString(base64);
        debugger;
        return axios
            .post('login', {userName, hashPassword})
    },
    me() {
        debugger;
        return withCookies
            .get(`login`)
    }
}