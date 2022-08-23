export interface UserRegister {
    user: UserClass;
    status: string;
}

export interface UserClass {
    name: string;
    email: string;
    password: string;
    id?: number;
}
