import axios from "axios";
const instance = axios.create({
    baseURL: 'https://burger-builder-6d19a-default-rtdb.asia-southeast1.firebasedatabase.app/'
})
export default instance;