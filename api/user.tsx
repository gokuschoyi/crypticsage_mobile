import axios from "axios";
const baseUrl = process.env.NODE_ENV === 'development' ?
    process.env.EXPO_PUBLIC_BACKEND_BASEURL :
    process.env.EXPO_PUBLIC_NGROK_BACKEND_URL;

type VerifyPassword = {
    token: string;
    payload: object;
}

export const verifyPassword = async (data: VerifyPassword) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    };
    const response = await axios.post(`${baseUrl}/user/verify_password`, payload, config)
    return response;
}

type UpdatePassword = {
    token: string;
    payload: object;
}

export const updatePassword = async (data: UpdatePassword) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    };
    const response = await axios.post(`${baseUrl}/user/update_password`, payload, config)
    return response;
}

type UpdateProfileImage = {
    token: string;
    payload: object;
}

export const updateProfileImage = async (data: UpdateProfileImage) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    };
    const response = await axios.post(`${baseUrl}/user/update_profileimage`, payload, config)
    return response;
}

type UpdateUserData = {
    token: string;
    payload: object;
}

export const updateUserData = async (data: UpdateUserData) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
    };
    const response = await axios.post(`${baseUrl}/user/update_userdata`, payload, config)
    return response;
}

export const updatePreferences = async (data) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${baseUrl}/user/update_preferences`, payload, config, {
        withCredentials: true
    })
    return response;
}

export const updatUserLessonStatus = async (data) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${baseUrl}/user/update_userLessonStatus`, payload, config, {
        withCredentials: true
    })
    return response;
}

export const getInitialQuizDataForUser = async (data) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${baseUrl}/user/get_initial_quiz_data_for_user`, payload, config, {
        withCredentials: true
    })
    return response;
}

export const getQuizQuestions = async (data) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${baseUrl}/user/getQuiz`, payload, config, {
        withCredentials: true
    })
    return response;
}

export const submitQuizResults = async (data) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${baseUrl}/user/submitQuiz`, payload, config, {
        withCredentials: true
    })
    return response;
}

export const getLatestLessonAndQuizResults = async (data) => {
    let token = data.token;
    let payload = data.payload
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.post(`${baseUrl}/user/get_recent_lesson_and_quiz`, payload, config, {
        withCredentials: true
    })
    return response;
}

export const getUserSavedModels = async (data) => {
    let token = data.token;
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(`${baseUrl}/indicators/fetch_saved_user_models`, config, {
        withCredentials: true
    })
    return response;
}   