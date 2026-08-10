import { CustomerNotFoundError } from "../errors/NotFound.js";
import type { Request, Response } from "express";
import * as customerService from "../services/customerService.js";

export function createCustomer(req: Request, res: Response) {
    try {
        //  Customer created succesfully
        const customer = customerService.createCustomer(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(400).json({
            error: (error as Error).message
        });
    }
}

export function getCustomers(req: Request, res: Response) {
    const customers = customerService.getCustomers();

    //  Return customers sucessfully (empty case is fine)
    res.status(200).json(customers);
}

export function getCustomer(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: "Customer ID must be a number"
        });
    }

    //  Check if customer exists
    try {
        const customer = customerService.getCustomer(id);

        //  Found customer successfully
        return res.status(200).json(customer);
    } catch (error) {
        if (error instanceof CustomerNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }
    }
}

export function updateCustomer(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: "Customer ID must be a number"
        });
    }

    //  Check if customer exists
    try {
        const customer = customerService.updateCustomer(id, req.body);

        //  Updated customer successfully and returns
        return res.status(200).json(customer);
    } catch (error) {
        if (error instanceof CustomerNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }
    }
}

export function deleteCustomer(req: Request, res: Response) {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            error: "Customer ID must be a number"
        });
    }

    //  Check if customer exists
    try {
        customerService.deleteCustomer(id);

        //  Deleted customer sucessfully (return no body)
        return res.status(204).end();
    } catch (error) {
        if (error instanceof CustomerNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }
    }
}