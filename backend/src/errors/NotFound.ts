export class CustomerNotFoundError extends Error {
    constructor(id: string) {
        super(`Customer with ID ${id} not found`);
        this.name = "CustomerNotFoundError";
    }
}

export class AccountNotFoundError extends Error {
    constructor(id: string) {
        super(`Account with ID ${id} not found`);
        this.name = "AccountNotFoundError";
    }
}