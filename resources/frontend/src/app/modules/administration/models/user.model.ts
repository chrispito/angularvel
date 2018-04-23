import { IUser } from './interfaces/IUser'
import { Injectable } from '@angular/core'
import { UserRole } from './user_role.model'

@Injectable()
export class User implements IUser {
    name: string
    joined:  Date
    email: string
    roles: UserRole[]
    id: number
}
