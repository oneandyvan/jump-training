import * as customerRepository from "../repositories/customerRepository.js";
import * as accountRepository from "../repositories/accountRepository.js";
import type { AccountInput } from "../types/account.js";
import { CustomerNotFoundError } from "../errors/NotFound.js";
import { AccountTypeError } from "../errors/InvalidOption.js";

export async function createAccount(input: AccountInput) {
    if (customerRepository.findCustomerById(input.user_id) === null) {
        throw new CustomerNotFoundError(input.user_id);
    }

    if (input.account_type !== "savings" && input.account_type !== "checking") {
        throw new AccountTypeError(input.account_type);
    }

    return accountRepository.createAccount(input);
}

export async function getAccounts(customer_id: string, premium: number | null) {
    if (customerRepository.findCustomerById(customer_id) === null) {
        throw new CustomerNotFoundError(customer_id);
    }

    //  If premium specified, only return accounts where balance is greater than premium
    const accounts = await accountRepository.getAccounts(customer_id);
    if (premium != null) {
        return accounts.filter((account) => account.balance > premium);
    }
    return accounts;
}

