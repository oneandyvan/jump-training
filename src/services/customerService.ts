import { CustomerNotFoundError } from "../errors/NotFound.js";
import * as customerRepository from "../repositories/customerRepository.js";
import type { CustomerInput } from "../types/customer.js";

export async function createCustomer(input: CustomerInput) {
    const existingCustomer = await customerRepository.findCustomerByEmail(input.email);
    if (existingCustomer) {
        throw new Error("Customer with this email already exists");
    }

    return customerRepository.createCustomer(input);
}

export async function getCustomers() {
    return customerRepository.getCustomers();
}

export async function getCustomer(id: string) {
    const customer = await customerRepository.findCustomerById(id);

    if (!customer) {
        throw new CustomerNotFoundError(id);
    }

    return customer;
}

export async function updateCustomer(id: string, input: CustomerInput) {
    const customer = await customerRepository.updateCustomer(id, input);

    if (!customer) {
        throw new CustomerNotFoundError(id);
    }

    return customer;
}

export async function deleteCustomer(id: string) {
    const customerDeleted = await customerRepository.deleteCustomer(id);

    if (!customerDeleted) {
        throw new CustomerNotFoundError(id);
    }
}

