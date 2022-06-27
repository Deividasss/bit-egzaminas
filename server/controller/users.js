import express from "express";
import {
  exists,
  getUserByEmail,
  insert,
  getAllUsers,
} from "../service/users.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import validator from "../middleware/validator.js";
import jsonwebtoken from "jsonwebtoken";
import { loadJsonFile } from "load-json-file";

const config = await loadJsonFile("./config.json");

const Router = express.Router();

const registerSchema = (req, res, next) => {
  const schema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.number().integer().required(),
  });

  validator(req, next, schema);
};

Router.get("/all", async (req, res) => {
  const users = await getAllUsers();
  if (users) {
    res.json({ message: users, status: "success" });
  } else {
    res.json({ message: "User was not found", status: "danger" });
  }
});

const loginSchema = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  validator(req, next, schema);
};

Router.post("/login", loginSchema, async (req, res) => {
  const user = await getUserByEmail(req.body.email);

  if (!user) {
    res.json({ message: "User was not found", status: "danger" });
    return;
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    res.json({ message: "Incorrect password", status: "danger" });
    return;
  }
  console.log(config.secret);

  const data = { email: req.body.email, id: user.id };
  const token = jsonwebtoken.sign(data, config.secret, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { path: "/" });
  res.json({
    message: {
      UserId: user.id,
      role: user.role,
      email: req.body.email,
    },
    status: "success",
  });
});

Router.post("/register", registerSchema, async (req, res) => {
  if (
    await exists({
      email: req.body.email,
    })
  ) {
    res.json({
      status: "danger",
      message: "User already exists with such email",
    });
    return;
  }

  req.body.password = await bcrypt.hash(req.body.password, 10);

  if (await insert(req.body)) {
    res.json({ status: "success", message: "User was created" });
  } else {
    res.json({ status: "danger", message: "Error" });
  }
});

Router.get("/logout", (req, res) => {
  res.clearCookie("token", { path: "/" }).end();
});
export default Router;
