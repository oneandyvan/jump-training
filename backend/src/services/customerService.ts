import { CustomerNotFoundError } from "../errors/NotFound.js";
import * as customerRepository from "../repositories/customerRepository.js";
import type { CustomerInput } from "../types/customer.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function createCustomer(input: CustomerInput) {
    const existingCustomer = await customerRepository.findCustomerByEmail(input.email);
    if (existingCustomer) {
        throw new Error("Customer with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(input.password, 10);

    const newCustomer = await customerRepository.createCustomer({
        ...input,
        password: hashedPassword
    });

    const token = jwt.sign(
        {   
            customerId: newCustomer.id,
            role: "customer"
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    return {
        customer: newCustomer,
        token: token
    }
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
    const customer = await customerRepository.findCustomerByEmail(email);
    if (!customer) {
        throw new Error("Invalid email or password");
    }

    const passwordMatches = await bcrypt.compare(password, customer.password);

    if (!passwordMatches) {
        throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
        {   
            customerId: customer.id,
            role: "customer"
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1h" }
    );

    return {
        customer: {
            id: customer.id,
            email: customer.email,
            name: customer.name
        },
        token: token
    };
}