import { Sequelize } from "sequelize";

import config from "../configuration/configuration.js";

const db = new Sequelize(config.database, config.userDB, config.passwordDB, {
  host: config.hostDB,
  dialect: "mysql",
  port: config.portDB,
});

export default db;
