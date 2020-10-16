var jwt = require("jwt-simple");
var { SECRET } = require("../config");
var moment = require("moment");

exports.createToken = (user) => {
  user.token = moment().unix();
  user.exp = moment().add(1, "h").unix();
  const crearToken = jwt.encode(user, SECRET);
  return crearToken;
  //const decodeToken = jwt.decode(crearToken, SECRET);
  //return { crearToken, decodeToken };
};

exports.createRefreshToken = (user) => {
  const payload = {
    idUser: user.idUser,
    exp: moment().add(1, "d").unix(),
  };
  const crearRefreshToken = jwt.encode(payload, SECRET);
  return crearRefreshToken;
};

exports.willExpireToken = (token) => {
  const tokenDecode = jwt.decode(token, SECRET);
  const currentDate = moment().unix();

  if (currentDate > tokenDecode.exp) {
    return true;
  } else {
    return false;
  }
};

exports.decodeToken = (token) => {
  const tokenDecode = jwt.decode(token, SECRET);
  return tokenDecode;
};
