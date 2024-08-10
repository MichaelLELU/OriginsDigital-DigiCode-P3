const express = require("express");

const router = express.Router();

const {
  allHerosliderVideos,
  addHerosliderVideo,
  removeHerosliderVideo,
  checkHerosliderVideo,
} = require("../../../controllers/herosliderActions");

// route to get all heroslider videos
router.get("/", allHerosliderVideos);

// route to add a video to the heroslider
router.post("/", addHerosliderVideo);

// route to remove a video from the heroslider
router.delete("/:videoId", removeHerosliderVideo);

// route to check if a video is in the heroslider
router.get("/:videoId", checkHerosliderVideo);

module.exports = router;
