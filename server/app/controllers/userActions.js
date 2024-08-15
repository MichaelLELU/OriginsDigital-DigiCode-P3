/* eslint-disable camelcase */
const tables = require("../../database/tables");

// Browse
const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Read
const read = async (req, res, next) => {
  try {
    const { id } = req.params || req.body;
    const user = await tables.user.readById(id);

    if (user != null) res.json(user);
    else res.sendStatus(404);
  } catch (error) {
    next(error);
  }
};

const editUserName = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstname, lastname } = req.body;

    await tables.user.updateUserName(firstname, lastname, id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

// Add
const add = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const role_id = req.body.role_id || 1;

    const userId = await tables.user.create(
      firstname,
      lastname,
      email,
      password,
      role_id
    );
    console.info(`New user created with id ${userId}`);

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

// Destroy
const destroy = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tables.user.destroy(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = { browse, read, editUserName, add, destroy };
