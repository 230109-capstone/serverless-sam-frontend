import { User } from "./User";

export interface AuthState {
    isLoggedIn: boolean;
    isRegistered: boolean;
    registeredError: boolean;
    loginError: boolean;
    user: User;
    isLoading: boolean;
}