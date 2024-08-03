const express = require("express");

const router = express.Router();

// sub-route to search videos
const searchRouter = require("./search/router");

router.use("/q", searchRouter);

// sub-route to get random and latest videos
const miscRouter = require("./misc/router");

router.use("/misc", miscRouter);

// define API routes

// import video-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/videoActions");

// route to get a list of videos
router.get("/", browse);

// route to get a specific video by id
router.get("/:id", read);

// route to add a new video
router.post("/", add);

// route to edit a video
router.put("/:id", edit);

// route to delete a video
router.delete("/:id", destroy);

module.exports = router;
