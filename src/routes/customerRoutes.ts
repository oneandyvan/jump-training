import { Router } from "express";
import { createCustomer, getCustomers, getCustomer } from "../controllers/customerController.js";

const router = Router();

//  Customers
router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);

export default router;