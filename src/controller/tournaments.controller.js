import { request, response } from "express";
import { Tournament } from "../models/Tournament.js";

const ctrlTournaments = {};

ctrlTournaments.getTournaments = async (req = request, res = response) => {
  try {
    const tournaments = await Tournament.findAll({
      where: {
        state: true,
      },
    });
    res.status(200).json({
      ok: true,
      tournaments,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: "Error in the server",
      error: e.message,
    });
  }
};

ctrlTournaments.createTournament = async (req = request, res = response) => {
  try {
    const { name, description, start_date, end_date } = req.body;

    let tournament = await Tournament.findOne({
      where: {
        name,
      },
    });

    if (tournament) {
      return res.status(400).json({
        ok: false,
        message: `Tournament ${name} already exists`,
      });
    }

    tournament = await Tournament.create({
      name,
      description,
      start_date,
      end_date,
    });

    res.status(201).json({
      ok: true,
      message: "Tournament created successfully",
      tournament,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: "Error in the server",
      error: e.message,
    });
  }
};

ctrlTournaments.getTournamentById = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    const tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({
        ok: false,
        message: `Tournament with id ${id} does not exist`,
      });
    }

    res.status(200).json({
      ok: true,
      tournament,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: "Error in the server",
      error: e.message,
    });
  }
};

ctrlTournaments.updateTournament = async (req = request, res = response) => {
  try {
    const { id } = req.params;
    const { name, description, start_date, end_date } = req.body;

    let tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({
        ok: false,
        message: `Tournament with id ${id} does not exist`,
      });
    }

    tournament = await tournament.update({
      name,
      description,
      start_date,
      end_date,
    });

    res.status(200).json({
      ok: true,
      message: "Tournament updated successfully",
      tournament,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: "Error in the server",
      error: e.message,
    });
  }
};

ctrlTournaments.deleteTournament = async (req = request, res = response) => {
  try {
    const { id } = req.params;

    let tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({
        ok: false,
        message: `Tournament with id ${id} does not exist`,
      });
    }

    tournament = await tournament.update({
      state: false,
    });

    res.status(200).json({
      ok: true,
      message: "Tournament deleted successfully",
      tournament,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      message: "Error in the server",
      error: e.message,
    });
  }
};

export default ctrlTournaments;
