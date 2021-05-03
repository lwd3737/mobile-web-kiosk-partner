import axios from "axios";

//const jsonServer = 'http://127.0.0.1:4000';
const devServer = "http://127.0.0.1:5000/partner";

axios.defaults.baseURL = devServer;
axios.defaults.headers.common["Content-Type"] = "application/json";

export default axios;

export const client = axios.create();
