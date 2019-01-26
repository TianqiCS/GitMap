import axios from 'axios';

export const fetchNodes = (userId)=> {
    let url = "http://vanillacraft.cn:3001";
    try {
        return axios.get(url + userId)
    } catch (error) {
        console.log(error);
        return null;
    }
};