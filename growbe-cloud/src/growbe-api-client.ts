import * as axios from 'axios';
import {env} from 'process';

export const client = axios.default;


let token: string = "";


export function setToken(t: string) {
    token = t;
}

export const getHeaders = () => {
    return {
        "Authorization": `Bearer ${token}`
    }
}


