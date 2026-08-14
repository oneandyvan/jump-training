import { Router } from "express";
import { createCustomer, getCustomers, getCustomer, updateCustomer, deleteCustomer, loginCustomer } from "../controllers/customerController.js";
import { getAccounts } from "../controllers/accountController.js";
import { getTransactionsForCustomer } from "../controllers/transactionController.js";
import { authenticate } from "../middleware/auth.js";


const router = Router();

router.post("/", createCustomer);
router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.put("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);
router.get("/:id/accounts", authenticate, getAccounts);

//  For login
router.post("/login", loginCustomer);

//  For fetching transactions of a customer
router.get("/:id/transactions", authenticate, getTransactionsForCustomer);

export default router;