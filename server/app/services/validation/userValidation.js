const Joi = require("joi");
const xss = require("xss");

const userValidationSchema = Joi.object({
  firstname: Joi.string().min(2).max(120).required(),
  lastname: Joi.string().min(2).max(120).required(),
  email: Joi.string()
    .max(120)
    .regex(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/)
    .required(),
  password: Joi.string()
    .max(64)
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){12,64}$/)
    .required(),
});

const userValidation = (req, res, next) => {
  delete req.body.confirmemail;
  delete req.body.confirmpassword;

  req.body.firstname = xss(req.body.firstname);
  req.body.lastname = xss(req.body.lastname);
  req.body.email = xss(req.body.email);

  const { error } = userValidationSchema.validate(req.body, {
    abortEarly: false,
  });

  if (error == null) {
    next();
  } else {
    res.json({ validationErrors: error.details });
  }
};

module.exports = userValidation;
