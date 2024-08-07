/* eslint-disable camelcase */
const tables = require("../../database/tables");

const allHerosliderVideos = async (req, res, next) => {
  try {
    const herosliderVideos = await tables.heroslider.allHerosliderVideos();

    res.json(herosliderVideos);
  } catch (err) {
    next(err);
  }
};

const addHerosliderVideo = async (req, res, next) => {
  try {
    const { video_id } = req.body;

    await tables.heroslider.addHerosliderVideo(video_id);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

const removeHerosliderVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;

    await tables.heroslider.removeHerosliderVideo(videoId);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  allHerosliderVideos,
  addHerosliderVideo,
  removeHerosliderVideo,
};
