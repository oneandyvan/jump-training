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

