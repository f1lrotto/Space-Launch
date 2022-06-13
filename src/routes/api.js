const express = require("express");

const planetRouter = require("./planets.router");
const launchesRouter = require("./launches.router");

const api = express.Router();

api.use("/planets", planetRouter);
api.use("/launches", launchesRouter);

module.exports = api;
