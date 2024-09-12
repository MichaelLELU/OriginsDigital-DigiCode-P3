const Joi = require("joi");

const categorySchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(2),
});

const validateCategory = (req, res, next) => {
  const { id, name } = req.body;

  try {
    categorySchema.validate({ id, name });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateCategory;
