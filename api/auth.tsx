import axios from "axios";
const baseUrl = process.env.NODE_ENV === 'development' ?
    process.env.EXPO_PUBLIC_BACKEND_BASEURL :
    process.env.EXPO_PUBLIC_NGROK_BACKEND_URL;

type LoginUserType = {
    login_type: string;
    email?: string;
    password?: string;
    credentials?: string;
    facebook_email?: string;
}

type SignupUserType = {
    login_type: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export const LoginUser = async (data: LoginUserType) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`, data, {
            withCredentials: false,
            timeout: 10000
        });
        return response;
    } catch (error) {
        console.log('Error : API', error)
    }
}

export const SignupUser = async (data: SignupUserType) => {
    const response = await axios.post(`${baseUrl}/auth/signup`, data, {
        withCredentials: false,
        timeout: 10000
    });
    return response;
}

export const signOutUser = async (uid: string, payload: object) => {
    const response = await axios.post(`${baseUrl}/auth/logout`, { uid, ...payload }, {
        withCredentials: false,
        timeout: 10000
    });
    return response;
}