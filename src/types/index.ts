export type Profile = {
    id: string;
    email: string | null;
    full_name: string | null;
    phone: string | null;
    role: 'super_admin' | 'moderator' | 'member' | 'staff';
    balance: number;
    points: number;
    gender: string | null;
    last_visit: string | null;
    referral_code: string | null;
    created_at: string;
};

export type Table = {
    id: string;
    name: string;
    image_url: string | null;
    price_per_hour: number;
    capacity_min: number | null;
    capacity_max: number | null;
    is_active: boolean;
};

export type Session = {
    id: string;
    table_id: string | null;
    table?: Table;
    start_time: string;
    end_time: string | null;
    status: 'active' | 'closed';
    total_amount: number;
    payment_method: 'cash' | 'visa' | 'wallet' | null;
    payment_details: any;
    created_by: string | null;
};

export type Product = {
    id: string;
    name: string;
    price: number;
    cost_price: number | null;
    stock: number;
    category: string | null;
    is_inventory: boolean;
    image_url: string | null;
};
