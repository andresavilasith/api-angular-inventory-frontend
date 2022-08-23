export interface LoginData {
    data: Data;
}

export interface Data {
    client_id:     number;
    client_secret: string;
    grant_type:    string;
}
