/* eslint-disable camelcase */
const tables = require("../../database/tables");

const checkFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    const favorite = await tables.favorite.isVideoFavorite(user_id, id);

    if (favorite == null) {
      res.sendStatus(204);
    } else {
      res.status(200).json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

const addFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    await tables.favorite.addFavorite(user_id, id);

    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
};

const removeFavorite = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    await tables.favorite.removeFavorite(user_id, id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const allFavorites = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const favorites = await tables.favorite.allFavorites(userId);

    res.status(200).json(favorites);
  } catch (err) {
    next(err);
  }
};

module.exports = { checkFavorite, addFavorite, removeFavorite, allFavorites };
