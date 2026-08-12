import { Router } from "express";
import { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer } from "../controllers/customerController.js";
import { getAccounts } from "../controllers/accountController.js";


const router = Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/:id/accounts", getAccounts);

export default router;