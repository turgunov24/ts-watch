import { create, index, get, remove, update } from "../controllers/users";
import express from "express";

const router = express.Router();

router.get("/users", index);
router.post("/users", create);
router.get("/users/:id", get);
router.put("/users/:id", update);
router.delete("/users/:id", remove);

export default router;
