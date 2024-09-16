import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import { authenticateToken } from "./middlewares/authentificateToken";
import { dbConnect } from "../config/db";
import Users from "./models/users";
import routes from "./routes";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use(routes);

app.get("/protected", authenticateToken, (req: Request, res: Response) => {
  res.json({ message: "Protected content" });
});

app.get("/add", async (req: Request, res: Response) => {
  try {
    const user = await Users.create({
      username: "turgunov",
      password: "123456",
      token: "something",
      status: 1,
    });

    console.log("successfully created", user);
    res.json({ message: "successfully created", user });
  } catch (error: unknown) {
    console.log("error", error);
  }
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await Users.findAll();

  res.json({ users });
});
app.listen(port, async () => {
  try {
    dbConnect();
    console.log(`Server is running on http://localhost:${port}`);
  } catch (error: unknown) {
    console.log(error);
  }
});
