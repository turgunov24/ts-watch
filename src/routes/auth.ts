import loginController from "../controllers/auth/login";
import express from "express";

const router = express.Router();

router.post("/login", loginController);

export default router;
