import axios from 'axios';
import { API_URL } from './envData';

console.log(API_URL)

export default axios.create({
    baseURL: API_URL,
    headers: { 'X-Custom-Header': 'foobar' }
});
