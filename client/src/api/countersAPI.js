import * as axios from 'axios';

const withCookies = axios.create({
    withCredentials: true
});

export const countersAPI = {
    getAllUserCounters() {
        return withCookies.get('/counters')
    },
    addNewCounter(serialNumber) {
        return withCookies.post('/counters', {serialNumber})
    },
    deleteCounter(serialNumber, code) {
        return withCookies.delete(`/counters/?serialNumber=${serialNumber}&code=${code}`)
    }
}