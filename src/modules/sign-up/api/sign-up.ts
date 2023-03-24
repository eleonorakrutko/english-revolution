import { AxiosResponse } from 'axios';
import  axios  from 'axios';
import { RolesEnum } from '../../../types/roles-enum';

export const signUp = async (email: string, username: string, password: string, first_name: string, last_name: string, role_type: RolesEnum) => {
    return await axios.post<AxiosResponse<any>>(`${process.env.REACT_APP_API_BASE_URL}/auth/sign-up`, {email, username, first_name, last_name, password, role_type})
}