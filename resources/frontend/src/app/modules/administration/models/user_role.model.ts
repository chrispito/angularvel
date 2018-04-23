import { IUserRole } from './interfaces/IUserRole';
import { Injectable } from '@angular/core';

@Injectable()
export class UserRole implements IUserRole {
    name: string;
    id: number;
}
