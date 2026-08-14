import { Router } from "express";
import { createAccount, getAccount, deleteAccount } from "../controllers/accountController.js";
import { depositTransaction, withdrawTransaction } from "../controllers/transactionController.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.use(authenticate);

router.post("/", createAccount);
router.get("/:id", getAccount);
router.post("/:id/deposit", depositTransaction);
router.post("/:id/withdraw", withdrawTransaction);
router.delete("/:id", deleteAccount);

export default router;