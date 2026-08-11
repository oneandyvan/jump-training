import type { Request, Response } from "express";
import * as accountService from "../services/accountService.js";

export async function createAccount(req: Request, res: Response) {
    try {
        const customer = await accountService.createAccount(req.body);
        res.status(201).json(customer);
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        });
    }
}