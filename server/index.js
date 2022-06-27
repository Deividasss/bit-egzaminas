import express from "express";
import database from "./database/connection.js";
import users from "./controller/users.js";
import auth from "./middleware/authentication.js";
import { getUser } from "./service/users.js";
import cookieParser from "cookie-parser";
import crowdfunder from "./controller/crowdFunder.js";
import donations from "./controller/donations.js";

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use("/api/users", users);
app.use("/api/crowdfunder", crowdfunder);
app.use("/api/donations", donations);

app.get("/checkAuth", auth, async (req, res) => {
  const userData = await getUser(req.authData.id);
  if (userData) {
    req.authData.role = userData.role;
  }
  res.json(req.authData);
});

app.listen(3001);
