import axios from 'axios'


export const postSignup = (user) => {
    return axios.post('/users', user);
} 