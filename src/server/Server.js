import express from "express";
import cors from "cors";
import morgan from "morgan";

import config from "../configuration/configuration.js";
import db from "../database/connection.js";
import tournamentsRoutes from "../routes/tournaments.routes.js";

// import "../models/Tournament.js";

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.middlewares();
    this.dbConnection();
    this.paths = {
      tournaments: "/api/tournaments",
    };
    this.routes();
  }

  config() {
    this.app.set("port", config.port);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  async dbConnection() {
    try {
      await db.authenticate();
      // await db.sync({ force: true });
      console.log("Connection has been established successfully.");
    } catch (error) {
      throw new Error(error);
    }
  }

  routes() {
    this.app.use(this.paths.tournaments, tournamentsRoutes);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log(`Server running on port ${this.app.get("port")}`);
    });
  }
}

export default Server;
