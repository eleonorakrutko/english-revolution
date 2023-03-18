import axios from "axios"

export const signIn = async (email: string, password: string) => {
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-in` as string, {email, password})
}