import express from "express";

import usersRoutes from "./users";
import authRoutes from "./auth";

const router = express.Router();

router.use(authRoutes);
router.use(usersRoutes);

export default router;
