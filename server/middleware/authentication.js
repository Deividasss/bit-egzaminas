import jsonwebtoken from "jsonwebtoken";
import { loadJsonFile } from "load-json-file";

const config = await loadJsonFile("./config.json");

export default async (req, res, next) => {
  if (!req.cookies?.token) {
    res.json({ message: "User not connected", status: "danger" });
    return;
  }

  jsonwebtoken.verify(req.cookies.token, config.secret, (err, decoded) => {
    if (err) {
      res.json({ message: "Bad token", status: "danger" });
      return;
    }
    req.authData = {
      email: decoded.email,
      id: decoded.id,
    };
    next();
  });
};
