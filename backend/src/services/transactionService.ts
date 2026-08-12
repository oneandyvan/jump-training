import * as accountRepository from "../repositories/accountRepository.js";
import * as transactionRepository from "../repositories/transactionRepository.js";
import { AccountNotFoundError } from "../errors/NotFound.js";

export async function depositTransaction(accountId: string, amount: number) {
    if (accountRepository.findAccountById(accountId) === null) {
        throw new AccountNotFoundError(accountId);
    }

    return transactionRepository.depositTransaction(accountId, amount);
} 