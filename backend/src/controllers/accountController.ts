import type { Request, Response } from "express";
import * as accountService from "../services/accountService.js";
import { AccountNotFoundError, CustomerNotFoundError } from "../errors/NotFound.js";

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

export async function getAccounts(req: Request, res: Response) {
    const id = req.params.id;
    const premium = typeof req.query.premium === "string" ? Number(req.query.premium) : null;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Customer ID is required"
        });
    }

    try {
        const accounts = await accountService.getAccounts(id, premium);
        return res.status(200).json(accounts);
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

export async function getAccount(req: Request, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Account ID is required"
        });
    }

    try {
        const account = await accountService.getAccount(id);
        return res.status(200).json(account);
    } catch (error) {
        if (error instanceof AccountNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }

        return res.status(500).json({
            error: (error as Error).message,
        });
    }
}