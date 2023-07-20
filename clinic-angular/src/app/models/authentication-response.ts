import { User } from "./user";

export class AuthenticationResponse {
    user!: User;
    token!: string;
}