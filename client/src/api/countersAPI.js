import * as axios from 'axios';

const withCookies = axios.create({
    withCredentials: true
});

export const countersAPI = {
    getAllUserCounters() {
        return withCookies.get('/counters')
    }
}