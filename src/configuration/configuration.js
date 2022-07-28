import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const config = {
  port: process.env.PORT || 3000,
  userDB: process.env.USER_DB,
  passwordDB: process.env.PASSWORD_DB,
  hostDB: process.env.HOST_DB,
  database: process.env.DATABASE,
  portDB: process.env.PORT_DB,
};

export default config;
