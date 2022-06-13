const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchId,
  abortLaunchById,
} = require("../../models/launches.model");

const { getPagination } = require("../../services/query");

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  getPagination;

  return res.status(200).json(await getAllLaunches(skip, limit));
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "missing launch property",
    });
  }

  launch.launchDate = new Date(launch.launchDate);
  if (launch.launchDate.toString() === "Invalid Date") {
    return res.status(400).json({
      error: "invalid date",
    });
  }

  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const id = +req.params.id;

  const exists = await existsLaunchId(id);
  if (!exists) {
    return res.status(404).json({
      error: "launch doesn't exist",
    });
  }
  const aborted = await abortLaunchById(id);
  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
