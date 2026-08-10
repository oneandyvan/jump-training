export class CustomerNotFoundError extends Error {
    constructor(id: number) {
        super(`Customer with ID ${id} not found`);
        this.name = "CustomerNotFoundError";
    }
}