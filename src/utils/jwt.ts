import { IUser } from "../../types";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const generateToken = ({
  password,
  username,
}: Pick<IUser, "username" | "password">) => {
  return jwt.sign({ password, username }, JWT_SECRET, {
    expiresIn: "1m",
  });
};

export { generateToken };
