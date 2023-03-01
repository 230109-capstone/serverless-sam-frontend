export interface User {
    userID: string;
    username: string;
    password: string;
    role: string;
}

export interface LoginUser {
    email: string;
    password: string;
}