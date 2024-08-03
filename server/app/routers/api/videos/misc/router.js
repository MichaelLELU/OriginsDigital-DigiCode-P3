const express = require("express");

const router = express.Router();

const { latest, random } = require("../../../../controllers/videoActions");

router.get("/latest", latest);
router.get("/random", random);

module.exports = router;
