import { CustomerNotFoundError } from "../errors/NotFound.js";
import * as customerRepository from "../repositories/customerRepository.js";
import type { CustomerInput } from "../types/customer.js";
import bcrypt from "bcrypt";

export async function createCustomer(input: CustomerInput) {
    const existingCustomer = await customerRepository.findCustomerByEmail(input.email);
    if (existingCustomer) {
        throw new Error("Customer with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    return customerRepository.createCustomer({
        ...input,
        password: hashedPassword
    });
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

export async function loginCustomer(email: string, password: string) {
    // TODO For now, we are not checking the password. In a real application, you would check the password here.
    const customer = await customerRepository.findCustomerByEmail(email);
    if (!customer) {
        throw new Error("Invalid email or password");
    }

    return customer;
}