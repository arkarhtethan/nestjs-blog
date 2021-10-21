import axios from '../config/axios';

export function fetchTags () {
    return axios.get('/post/tags/')
}

export function fetchCategories () {
    return axios.get('/post/categories/')
}