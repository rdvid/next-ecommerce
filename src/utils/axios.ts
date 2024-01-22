import { Axios } from "axios";

export const axiosInstance: Axios = new Axios({
    baseURL: process.env.API_URL,
    params: {
        'pagination[page]': 1,
        'pagination[pageSize]': 20
    }
})