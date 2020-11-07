import * as axios from "axios";

export const authAPI = {
    me() {
        return axios.get('auth/me', {withCredentials: true});
    }
}