import { loadJsonFile } from "load-json-file";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { users } from "./model/users.js";
import { crowdFunder } from "./model/CrowdFunder.js";
import { donations } from "./model/Donations.js";

const config = await loadJsonFile("./config.json");

const { host, port, user, password, db } = config.database;

export const database = {};

try {
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query("CREATE DATABASE IF NOT EXISTS `" + db + "`;");
  connection.end();

  const sequelize = new Sequelize(db, user, password, { dialect: "mysql" });

  database.Users = users(sequelize);
  database.CrowdFunder = crowdFunder(sequelize);
  database.Donations = donations(sequelize);

  await sequelize.sync({ alter: false });
} catch {
  console.log("Unssuccesful attempt to reach Database");
}

export default config;
