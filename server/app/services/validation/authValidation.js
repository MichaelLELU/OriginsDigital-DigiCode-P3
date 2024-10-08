const Joi = require("joi");
const xss = require("xss");

const authSchema = Joi.object({
  email: Joi.string().regex(
    /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
  ),
  password: Joi.string().regex(
    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){12,64}$/
  ),
});

const validateAuth = (req, res, next) => {
  req.body.email = xss(req.body.email);

  const { email, password } = req.body;

  try {
    authSchema.validate({ email, password });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateAuth;
