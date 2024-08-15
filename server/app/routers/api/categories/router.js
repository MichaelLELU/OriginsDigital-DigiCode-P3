const express = require("express");

const router = express.Router();

const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/categoryActions");

const adminWall = require("../../../services/adminWall");

router.get("/", browse);

router.get("/:name", read);

// secure routes with adminWall
router.use(adminWall);

router.put("/:id", edit);

router.post("/", add);

router.delete("/:id", destroy);

module.exports = router;
