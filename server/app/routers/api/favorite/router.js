const express = require("express");

const router = express.Router();

const {
  checkFavorite,
  addFavorite,
  removeFavorite,
  allFavorites,
} = require("../../../controllers/favoriteController");

// check if a video is favorited
router.get("/check/:userId/:videoId", checkFavorite);

// add a video to favorites
router.post("/:videoId", addFavorite);

// remove a video from favorites
router.delete("/:videoId", removeFavorite);

// get all favorites
router.get("/:userId", allFavorites);

module.exports = router;
