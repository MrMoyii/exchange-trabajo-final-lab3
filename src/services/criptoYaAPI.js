import axios from 'axios'

const apiClient = axios.create({
    baseURL: 'https://criptoya.com/api/argenbtc/',
})

export default {
    getEvents(){
        return apiClient.get('/events')
    },
    getEvent(coin){
        return apiClient.get(coin + '/ars')
    }
}