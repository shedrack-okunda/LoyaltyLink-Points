import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getCustomersForShop } from "../controllers/shopController.js";

const router = express.Router();

router.get("/customers", verifyToken, getCustomersForShop);

export default router;
