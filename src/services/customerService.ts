import { CustomerNotFoundError } from "../errors/NotFound.js";
import * as customerModel from "../models/customerModel.js";

interface CreateCustomerInput {
    name: string;
    email: string;
}

export function createCustomer(input: CreateCustomerInput) {
    if (customerModel.findCustomerByEmail(input.email)) {
        throw new Error("Customer with this email already exists");
    }

    const customer = {
        name: input.name,
        email: input.email
    };

    return customerModel.createCustomer(customer);
}

export function getCustomers() {
    return customerModel.getCustomers();
}

export function getCustomer(id: number) {
    const customer = customerModel.findCustomerById(id);

    if (!customer) {
        throw new CustomerNotFoundError(id);
    }

    return customer;
}

export function updateCustomer(id: number, input: CreateCustomerInput) {
    const customer = customerModel.updateCustomer(id, input);

    if (!customer) {
        throw new CustomerNotFoundError(id);
    }

    return customer;
}

export function deleteCustomer(id: number) {
    const customerDeleted = customerModel.deleteCustomer(id);

    if (!customerDeleted) {
        throw new CustomerNotFoundError(id);
    }
}

