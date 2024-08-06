const express = require("express");

const router = express.Router();

const {
  checkFavorite,
  addFavorite,
  removeFavorite,
  allFavorites,
} = require("../../../controllers/favoriteController");

// check if a video is favorited
router.post("/check/:id", checkFavorite);

// add a video to favorites
router.post("/:id", addFavorite);

// remove a video from favorites
router.delete("/:id", removeFavorite);

// get all favorites
router.get("/:id", allFavorites);

module.exports = router;
