import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-4fb3d.firebaseio.com/'
})

export default instance;
