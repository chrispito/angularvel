import { IUserRole } from './IUserRole'
export interface IUser {
    name: string;
    joined:  Date
    email: string
    roles: IUserRole[]
    id: number
}
