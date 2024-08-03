const express = require("express");

const router = express.Router();

const {
  latest,
  random,
  herosliderVideos,
} = require("../../../../controllers/videoActions");

// route to get the latest videos
router.get("/latest", latest);

// route to get random videos
router.get("/random", random);

// route to get the videos in the hero slider
router.get("/heroslider", herosliderVideos);

module.exports = router;
