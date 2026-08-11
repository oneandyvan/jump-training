export class CustomerNotFoundError extends Error {
    constructor(id: string | number) {
        super(`Customer with ID ${id} not found`);
        this.name = "CustomerNotFoundError";
    }
}