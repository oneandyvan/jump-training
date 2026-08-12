import type { Request, Response } from "express";
import * as transactionService from "../services/transactionService.js";

export async function depositTransaction(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Account ID is required"
        });
    }

    try {
        const customer = await transactionService.depositTransaction(id, req.body.amount);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        });
    }
}