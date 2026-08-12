export class AccountTypeError extends Error {
    constructor(type: string) {
        super(`'${type}' is not a valid account type`);
        this.name = "AccountTypeError";
    }
}