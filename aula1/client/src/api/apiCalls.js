import axios from 'axios'


export const postSignup = (user) => {
    return axios.post('/users', user);
};

export const login = (user) => {
    return axios.post('/login', user);
};