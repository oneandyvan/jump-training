import express from "express";
import customerRoutes from "./routes/customerRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/v1/customers", customerRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Hello from Express!"
    });
});

export default app;