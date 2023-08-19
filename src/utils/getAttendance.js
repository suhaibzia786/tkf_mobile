import axios from "axios";
import API from '@/config/api.config'

export const getAttendance = async () => {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    const response = await API.post('getAttendance', {user_id: user.id})
    return response.data
}
