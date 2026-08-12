import express from "express";
import customerRoutes from "./routes/customerRoutes.js";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/customers", customerRoutes);
app.use("/api/v1/accounts", accountRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Hello from Express!"
    });
});

export default app;