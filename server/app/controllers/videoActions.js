/* eslint-disable camelcase */
// import access to database tables
const tables = require("../../database/tables");

// Browse (read all)

const browse = async (req, res, next) => {
  try {
    // fetch all videos from the database
    const videos = await tables.video.readAll();

    res.status(200).json(videos);
  } catch (err) {
    // pass any errors to the error-handling middleware
    next(err);
  }
};

// Read
const read = async (req, res, next) => {
  try {
    // get the id of the video from the request body
    const { id } = req.params;
    // fetch a specific video from the database based on the provided id
    const video = await tables.video.read(id);

    // if the video is not found, respond with (http) 404 (not found)
    // otherwise respond with the video in json format
    if (video == null) {
      res.sendStatus(404);
    } else {
      res.status(200).json(video);
    }
  } catch (err) {
    // pass any errors to the error-handling middleware
    next(err);
  }
};

// Edit
const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { is_connected } = req.body;

    await tables.video.edit(is_connected, id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Add (create)

const add = async (req, res, next) => {
  // extract the video data from the request body
  const video = req.body;

  try {
    // insert the video into the databse
    const insertId = await tables.video.create(video);

    // respond with http 201 (created) and the id of the newly inserted video
    res.status(201).json({ insertId });
  } catch (err) {
    // pass any errors to the error-handling middleware
    next(err);
  }
};

// Delete (destroy)

const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tables.video.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Search (query)

const query = async (req, res, next) => {
  try {
    const { search } = req.params;

    const searchResults = await tables.video.query(search);

    res.json(searchResults);
  } catch (err) {
    next(err);
  }
};

const random = async (req, res, next) => {
  try {
    const videos = await tables.video.browseRandom();

    res.json(videos);
  } catch (err) {
    next(err);
  }
};

const latest = async (req, res, next) => {
  try {
    const videos = await tables.video.browseLatest();

    res.json(videos);
  } catch (err) {
    next(err);
  }
};

const herosliderVideos = async (req, res, next) => {
  try {
    const videos = await tables.video.herosliderVideos();

    res.json(videos);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  query,
  random,
  latest,
  herosliderVideos,
};
