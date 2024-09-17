import { hashPassword } from "../../utils/bcrypt";
import { generateToken } from "../../utils/jwt";
import { Request, Response } from "express";
import Users from "../../models/users";
import { pick } from "lodash";

const index = async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll();
    res.json({ users });
  } catch (error: unknown) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const hashedPassword = await hashPassword(password);

    const token = generateToken({
      username,
      password,
    });

    const user = await Users.create({
      username,
      password: hashedPassword,
      status: 1,
      token,
    });

    res.json({
      message: "User succesfully created",
      user: pick(user.toJSON(), ["username", "status", "token"]),
    });
  } catch (error: unknown) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const get = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Id not provided" });

    const user = await Users.findByPk(id);

    if (!user) return res.status(400).json({ message: "User not found" });

    res.json(pick(user.toJSON(), ["username", "status", "id"]));
  } catch (error: unknown) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Id not provided" });

    const user = await Users.findByPk(id);

    if (!user) return res.status(400).json({ message: "User not found" });

    await user.update(req.body);

    res.json(user);
  } catch (error: unknown) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const remove = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Id not provided" });

    const user = await Users.findByPk(id);

    if (!user) return res.status(400).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted" });
  } catch (error: unknown) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { index, create, get, update, remove };
