const express = require("express");

const router = express.Router();

const {
  allHerosliderVideos,
  addHerosliderVideo,
  removeHerosliderVideo,
  checkHerosliderVideo,
} = require("../../../controllers/herosliderActions");

const adminWall = require("../../../services/adminWall");

// route to get all heroslider videos
router.get("/", allHerosliderVideos);

// route to check if a video is in the heroslider
router.get("/:videoId", checkHerosliderVideo);

// secure routes with adminWall
router.use(adminWall);

// route to add a video to the heroslider
router.post("/", addHerosliderVideo);

// route to remove a video from the heroslider
router.delete("/:videoId", removeHerosliderVideo);

module.exports = router;
