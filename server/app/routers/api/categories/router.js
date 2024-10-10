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
const categoryValidation = require("../../../services/validation/categoryValidation");

router.get("/", browse);

router.get("/:name", read);

// secure routes with adminWall
router.use(adminWall);

router.put("/:id", categoryValidation, edit);

router.post("/", categoryValidation, add);

router.delete("/:id", categoryValidation, destroy);

module.exports = router;
