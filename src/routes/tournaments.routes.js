import { Router } from "express";
import ctrlTournaments from "../controller/tournaments.controller.js";

const router = Router();

router.get("/", ctrlTournaments.getTournaments);
router.post("/", ctrlTournaments.createTournament);
router.get("/:id", ctrlTournaments.getTournamentById);
router.put("/:id", ctrlTournaments.updateTournament);

export default router;
