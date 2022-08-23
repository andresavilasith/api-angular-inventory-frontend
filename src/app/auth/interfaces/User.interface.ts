export interface User {
    users:  UserElement[];
    status: string;
}

export interface UserElement {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    created_at:        Date;
    updated_at:        Date;
    roles:             Role[];
}

export interface Role {
    id:          number;
    name:        string;
    slug:        string;
    description: string;
    full_access: string;
    created_at:  Date;
    updated_at:  Date;
    pivot:       Pivot;
}

export interface Pivot {
    user_id:    number;
    role_id:    number;
    created_at: Date;
    updated_at: Date;
}
