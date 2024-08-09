const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");

router.use("/users", usersRouter);

const videosRouter = require("./videos/router");

router.use("/videos", videosRouter);

const categoriesRouter = require("./categories/router");

router.use("/categories", categoriesRouter);

const authRouter = require("./auth/router");

router.use("/auth", authRouter);

const favoriteRouter = require("./favorite/router");

router.use("/favorites", favoriteRouter);

const herosliderRouter = require("./heroslider/router");

router.use("/heroslider", herosliderRouter);

/* ************************************************************************* */

module.exports = router;
