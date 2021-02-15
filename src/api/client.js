import axios from 'axios';

const jsonServer = 'http://127.0.0.1:4000';
const devServer = 'http://127.0.0.1:5000/partner';

const client = axios.create({
    baseURL: devServer
});

export default client;