export interface Customer {
    id: string;
    name: string;
    email: string;
    password: string;
}

export type CustomerInput = Omit<Customer, "id">;
