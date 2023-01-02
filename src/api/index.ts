import axios, { AxiosInstance } from 'axios'

const request: AxiosInstance = axios.create({
    baseURL: "http://192.168.3.172:8080/"
})

request.interceptors.response.use(response => {
    return response?.data;
},)



export default request;

export interface RequestObg {
    status: number;
    msg: string;
    data: any;
}