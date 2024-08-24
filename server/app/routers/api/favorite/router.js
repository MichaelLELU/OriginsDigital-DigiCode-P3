const express = require("express");

const router = express.Router();

const {
  checkFavorite,
  addFavorite,
  removeFavorite,
  allFavorites,
} = require("../../../controllers/favoriteController");

const userWall = require("../../../services/userWall");

// check if a video is favorited
router.get("/check/:userId/:videoId", checkFavorite);

// get all favorites
router.get("/:userId", allFavorites);

// secure routes with userWall
router.use(userWall);

// add a video to favorites
router.post("/:videoId", addFavorite);

// remove a video from favorites
router.delete("/:videoId", removeFavorite);

module.exports = router;
