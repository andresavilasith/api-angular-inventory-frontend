export interface UserPermissions {
    permissions: Permission[];
}

export interface Permission {
    id:          number;
    category_id: number;
    name:        string;
    slug:        string;
    description: string;
    created_at:  Date;
    updated_at:  Date;
    pivot:       Pivot;
}

export interface Pivot {
    role_id:       number;
    permission_id: number;
    created_at:    Date;
    updated_at:    Date;
}
