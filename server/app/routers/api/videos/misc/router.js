const express = require("express");

const router = express.Router();

const { latest, random } = require("../../../../controllers/videoActions");

// route to get the latest videos
router.get("/latest", latest);

// route to get random videos
router.get("/random", random);

module.exports = router;
