export interface Customer {
    id: string;
    name: string;
    email: string;
}

export type CustomerInput = Omit<Customer, "id">;
