export interface Customer {
    id: number;
    name: string;
    email: string;
}

const customers: Customer[] = [];
let nextId = 1; //  Simulate database AUTO-INCREMENT

export function createCustomer(customerDetails: Omit<Customer, "id">): Customer {
    const customer: Customer = {
        ...customerDetails,
        id: nextId++,
    }

    return customer;
}

export function findCustomerById(id: number): Customer | undefined {
    return customers.find(customer => customer.id === id);
}