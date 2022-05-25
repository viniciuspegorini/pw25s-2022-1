import axios from 'axios';

const save = (category) => {
    return axios.post('/categories', category, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/categories', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/categories/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/categories/${id}`, {headers: getAuthHeader()});
}

const CategoryService = {
    save,
    findAll,
    findOne,
    remove
}

const getAuthHeader = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        return {Authorization: `Bearer ${token}`}; //'Bearer ' + token
    } else {
        return {}
    }
}

export default CategoryService;