import axios from "axios";
import {API_BASE_URL} from "@/config/app.config";

const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
export default axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Authorization: 'Bearer ' + user.token
    }
})