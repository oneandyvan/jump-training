import type { Response } from "express";
import type { AuthenticatedRequest } from "../middleware/auth.js";
import * as accountService from "../services/accountService.js";
import * as transactionService from "../services/transactionService.js";
import { AccountNotFoundError } from "../errors/NotFound.js";

export async function depositTransaction(req: AuthenticatedRequest, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Account ID is required"
        });
    }

    try {
        const account = await accountService.getAccount(id);

        if (account.user_id !== req.customerId) {
            return res.status(403).json({
                error: "You cannot deposit into another customer's account"
            });
        }

        const customer = await transactionService.depositTransaction(id, req.body.amount);
        res.status(201).json(customer);
    } catch (error) {
        if (error instanceof AccountNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: (error as Error).message
        });
    }
}

export async function withdrawTransaction(req: AuthenticatedRequest, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Account ID is required"
        });
    }

    try {
        const account = await accountService.getAccount(id);

        if (account.user_id !== req.customerId) {
            return res.status(403).json({
                error: "You cannot withdraw from another customer's account"
            });
        }

        const customer = await transactionService.withdrawTransaction(id, req.body.amount);
        res.status(201).json(customer);
    } catch (error) {
        if (error instanceof AccountNotFoundError) {
            return res.status(404).json({
                error: error.message
            });
        }

        res.status(500).json({
            error: (error as Error).message
        });
    }
}

export async function getTransactionsForCustomer(req: AuthenticatedRequest, res: Response) {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        return res.status(400).json({
            error: "Customer ID is required"
        });
    }

    try {
        if (id !== req.customerId) {
            return res.status(403).json({
                error: "You cannot view another customer's transactions"
            });
        }

        const transactions = await transactionService.getTransactionsForCustomer(req.customerId);
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({
            error: (error as Error).message
        });
    }
}