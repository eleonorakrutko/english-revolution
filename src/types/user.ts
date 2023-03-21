import { RolesEnum } from './roles-enum';

export interface User {
    email: string,
    first_name: string,
    id: number,
    last_name: string,
    role_type: RolesEnum,
    user_role_id: number,
    username: string
}