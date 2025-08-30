import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  replaceUser,
  updateUser,
} from "../controller/userController";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", replaceUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
