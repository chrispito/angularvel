import { IUser } from "./interfaces/IUser";
import { Injectable } from "@angular/core";

@Injectable()
export class User implements IUser {
    name: string;
    joined:  Date;
    email: string;
    type: string;
    id: number
}