import axios from 'axios';

const save = (product) => {
    return axios.post('/products', product, {headers: getAuthHeader()});
}

const findAll = () => {
    return axios.get('/products', {headers: getAuthHeader()});
}

const findOne = (id) => {
    return axios.get(`/products/${id}`, {headers: getAuthHeader()});
}

const remove = (id) => {
    return axios.delete(`/products/${id}`, {headers: getAuthHeader()});
}

const ProductService = {
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

export default ProductService;