export class MongoConnectionNotFound extends Error {
    constructor() {
        super("MongoDB client is not connected. Call connectToDatabase() first.");
        this.name = "MongoConnectionNotFound";
    }
}