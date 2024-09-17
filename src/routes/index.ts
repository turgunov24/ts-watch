import express from "express";

import usersRoutes from "./users";
import authRoutes from "./auth";
import referenceMainRoutes from "./reference/main";

import { authenticateToken } from "../middlewares/authentificateToken";

const router = express.Router();

router.use(authRoutes);
router.use(referenceMainRoutes);
router.use(usersRoutes);

export default router;
