const validateJoke = (req, res, next) => {
  if (!req.body.joke || !req.body.content) {
    return res.status(400).send({
      message: "Missing Fileds",
    });
  }
  next();
};

export const validator = {
   validateJoke,
  };
