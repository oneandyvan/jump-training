import "dotenv/config";
import app from "./app.js";
import { connectToDatabase } from "./db.js";

const PORT = 8080;

async function startServer() {
    await connectToDatabase();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});
