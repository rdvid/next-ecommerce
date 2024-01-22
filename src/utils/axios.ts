import { Axios } from "axios";

export const axiosInstance: Axios = new Axios({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    
})