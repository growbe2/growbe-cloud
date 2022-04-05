import * as axios from 'axios';
import {env} from 'process';

export const client = axios.default;


let token: string = "";

export const login = async (email: string, password: string) => {
    console.log(email, password);
    const response = await client.post(`${env.SSO_URL}/api/users/login`,{
        email,
        password
    }) as any;

    token = response.data.token;
}


export const getHeaders = () => {
    return {
        "Authorization": `Bearer ${token}`
    }
}


