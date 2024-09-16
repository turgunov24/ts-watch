import { hashPassword } from "../../utils/bcrypt";
import { Request, Response } from "express";
import Users from "../../models/users";

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

    const user = await Users.create({
      username,
      password: hashedPassword,
      status: 1,
      token: "something",
    });

    res.json({ message: "User succesfully created", user });
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

    res.json(user);
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
