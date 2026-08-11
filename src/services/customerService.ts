import { CustomerNotFoundError } from "../errors/NotFound.js";
import * as customerModel from "../models/customerModel.js";

interface CreateCustomerInput {
    name: string;
    email: string;
}

export async function createCustomer(input: CreateCustomerInput) {
    const existingCustomer = await customerModel.findCustomerByEmail(input.email);
    if (existingCustomer) {
        throw new Error("Customer with this email already exists");
    }

    const customer = {
        name: input.name,
        email: input.email
    };

    return customerModel.createCustomer(customer);
}

export async function getCustomers() {
    return customerModel.getCustomers();
}

export async function getCustomer(id: string) {
    const customer = await customerModel.findCustomerById(id);

    if (!customer) {
        throw new CustomerNotFoundError(id);
    }

    return customer;
}

export async function updateCustomer(id: string, input: CreateCustomerInput) {
    const customer = await customerModel.updateCustomer(id, input);

    if (!customer) {
        throw new CustomerNotFoundError(id);
    }

    return customer;
}

export async function deleteCustomer(id: string) {
    const customerDeleted = await customerModel.deleteCustomer(id);

    if (!customerDeleted) {
        throw new CustomerNotFoundError(id);
    }
}

