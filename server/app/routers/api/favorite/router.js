const express = require("express");

const router = express.Router();

const {
  checkFavorite,
  addFavorite,
  removeFavorite,
} = require("../../../controllers/favoriteController");

// check if a video is favorited
router.get("/check/:id", checkFavorite);

// add a video to favorites
router.post("/:id", addFavorite);

// remove a video from favorites
router.delete("/:id", removeFavorite);

module.exports = router;
