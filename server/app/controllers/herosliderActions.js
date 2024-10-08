/* eslint-disable camelcase */
const tables = require("../../database/tables");

const allHerosliderVideos = async (req, res, next) => {
  try {
    const herosliderVideos = await tables.heroslider.allHerosliderVideos();

    if (herosliderVideos.length === 0) {
      res.sendStatus(204);
    } else {
      res.json(herosliderVideos);
    }
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

const checkHerosliderVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const herosliderVideo =
      await tables.heroslider.checkHerosliderVideo(videoId);

    if (herosliderVideo === undefined) {
      res.sendStatus(204);
    } else {
      res.status(200).json(herosliderVideo);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  allHerosliderVideos,
  addHerosliderVideo,
  removeHerosliderVideo,
  checkHerosliderVideo,
};
