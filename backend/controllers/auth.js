const register = (req, res) => {
  // console.log(req.body);
  res.status(200).send("Ok");
};

const login = (req, res) => {
  // console.log(req.body);
  res.status(200).send("login done");
};

module.exports = {
  register,
  login,
};
