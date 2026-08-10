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