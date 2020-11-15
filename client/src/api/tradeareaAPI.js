import * as axios from 'axios';

const withCookies = axios.create({
    withCredentials: true
});

export const tradeareaAPI = {
    sellCertificate(id) {
        return withCookies.post('/tradearea', {id})
    },
    unsellCertificate(id) {
        return withCookies.delete(`/tradearea?id=${id}`)
    },
    getAllDeals() {
        return axios.get('/tradearea');
    }
}

