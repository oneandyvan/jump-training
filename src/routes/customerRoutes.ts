import { Router } from "express";
import { createCustomer, getCustomers, getCustomer, updateCustomer } from "../controllers/customerController.js";

const router = Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);

export default router;