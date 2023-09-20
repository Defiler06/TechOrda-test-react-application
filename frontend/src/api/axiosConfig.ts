import axios, {AxiosInstance} from "axios";

const axiosConfig: AxiosInstance = axios.create({
    baseURL: "http://165.232.76.67:5000"
})

export default axiosConfig