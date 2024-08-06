const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const categories = await tables.category.browse();

    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};
const read = async (req, res, next) => {
  const { name } = req.params;

  try {
    const category = await tables.category.read(name);

    if (category == null || category.length === 0) {
      res.sendStatus(404);
    } else {
      res.status(200).json(category);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const category = req.body;

  try {
    const insertId = await tables.category.create(category);

    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await tables.category.edit(name, id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;

  try {
    await tables.category.delete(id);

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
