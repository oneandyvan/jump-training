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
    customers.push(customer);

    return customer;
}

export function getCustomers(): Customer[] {
    return customers;
}

export function findCustomerById(id: number): Customer | undefined {
    return customers.find(customer => customer.id === id);
}

export function findCustomerByEmail(email: string): Customer | undefined {
    return customers.find(customer => customer.email === email);
}