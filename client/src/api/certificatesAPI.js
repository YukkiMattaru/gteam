import * as axios from 'axios';

const withCookies = axios.create({
    withCredentials: true
});

export const certificatesAPI = {
    getAllUserCertificates() {
        return withCookies.get('/certificates')
    },
    deleteCertificate(id) {
        return withCookies.delete(`/certificates?id=${id}`)
    },
}