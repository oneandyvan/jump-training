import { Router } from "express";
import { createAccount, getAccounts } from "../controllers/accountController.js";

const router = Router();

router.post("/", createAccount);
router.get("/:id", getAccounts);

export default router;