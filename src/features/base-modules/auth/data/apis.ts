import { getData, postData } from '@/utils/dataClient'

export async function fetchUserProfileService() {
    console.log('fetchUserProfileService called');
    const data = await getData('/auth/profile')
     console.log("calling profile API",data);
    return data

    
}

export async function changePasswordService(payload: any) {

    return await postData('/auth/change-password', payload)
}

export async function loginService(payload: any) {
    // console.log('loginService called', payload);
    const data = await postData('/auth/login', payload)
    // console.log(data);
    return data

    // return (await axiosClient.post("/auth/login", payload)).data
}
export async function logoutService() {
    const data = await postData('/auth/logout', [])

    return data
}

export async function signupService(payload: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}) {
    return await postData('/auth/register', payload)
}