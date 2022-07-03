import axios from 'axios';

const API_ROOT = "/api/users/";

const register = async (user) => {
    const response = await axios.post(API_ROOT, user);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const login = async (user) => {
    const response = await axios.post(API_ROOT + 'login', user);

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

const logout = async () => {
    localStorage.removeItem('user');
}

const authHelper = { register, login, logout };

export default authHelper;