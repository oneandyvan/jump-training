import { Router } from "express";
import { createAccount, getAccount } from "../controllers/accountController.js";
import { depositTransaction } from "../controllers/transactionController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.post("/", createAccount);
router.get("/:id", getAccount);
router.post("/:id/deposit", depositTransaction);

export default router;