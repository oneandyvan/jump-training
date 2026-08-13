import { CustomerNotFoundError } from "../errors/NotFound.js";
import type { Request, Response } from "express";
import * as customerService from "../services/customerService.js";

export async function createCustomer(req: Request, res: Response) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, email, and password are required"
        });
    }

    try {
        const customer = await customerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        });
    }
}

export async function getCustomers(req: Request, res: Response) {
    const customers = await customerService.getCustomers();
    res.status(200).json(customers);
}

export async function getCustomer(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Customer ID is required"
        });
    }

    try {
        const customer = await customerService.getCustomer(id);
        return res.status(200).json(customer);
    } catch (error) {
        if (error instanceof CustomerNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }

        return res.status(500).json({
            error: (error as Error).message,
        });
    }
}

export async function updateCustomer(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Customer ID is required"
        });
    }

    try {
        const customer = await customerService.updateCustomer(id, req.body);
        return res.status(200).json(customer);
    } catch (error) {
        if (error instanceof CustomerNotFoundError) {
            return res.status(404).json({
                error: error.message,
            });
        }

        return res.status(500).json({
            error: (error as Error).message,
        });
    }
}

export async function deleteCustomer(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Customer ID is required"
        });
    }

    try {
        await customerService.deleteCustomer(id);
        return res.status(204).end();
    } catch (error) {
        if (error instanceof CustomerNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }

        return res.status(500).json({
            error: (error as Error).message,
        });
    }
}

export async function loginCustomer(req: Request, res: Response) {
    const { email, password } = req.body;   

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    try {
        const customer = await customerService.loginCustomer(email, password);
        return res.status(200).json(customer);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({
                error: error.message
            });
        }  
    }
}