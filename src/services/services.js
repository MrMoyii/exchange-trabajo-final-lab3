import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest/',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});


export default {
    getEvents(){
        return apiClient.get('/events')
    },
    getEvent(id){
        return apiClient.get('/events/' + id)
    }
}