import * as customerModel from "../models/customerModel.js";

interface CreateCustomerInput {
    name: string;
    email: string;
}

export function createCustomer(input: CreateCustomerInput) {

    const customer = {
        name: input.name,
        email: input.email
    };

    return customerModel.createCustomer(customer);
}

