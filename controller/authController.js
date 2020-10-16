const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const {
  createToken,
  createRefreshToken,
  willExpireToken,
  decodeToken,
} = require("../configs/jwtConfig");

//const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  const { name, lastname, email, password } = req.body;

  //Devuelve un true o false
  //bcrypt.compareSync(password, passwordHasheada));
  //bcrypt.hashSync(password, saltRounds)

  const newUser = {
    name,
    lastname,
    email: email.toLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: "client",
    avatar: null,
    active: true,
  };

  //Envio de Email
  /*
  const message = {
    from: "oavr.18@gmail.com",
    to: "oavr.18@gmail.com",
    subject: "Message title",
    text: "Plaintext version of the message",
    html: "<p>HTML version of the message</p>",
  };

  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    auth: {
      user: "8bd57598c358bd",
      pass: "3103587762249a",
    },
  });

  transport.sendMail(message);
  */

  try {
    const createNewUser = await userModel.create(newUser);
    if (createNewUser) {
      res.status(200).send({ created: true });
    } else {
      res.status(500).send({ msg: "Lo siento hubo un error interno" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.errors[0].message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ where: { email: email } });

  if (user.dataValues) {
    const verifyPassword = bcrypt.compareSync(password, user.password);

    if (verifyPassword) {
      const userToken = createToken(user.dataValues);
      const refreshToken = createRefreshToken(user.dataValues);

      res.status(200).send({ token: userToken, refreshToken });
    } else {
      res.status(400).send({ msg: "La contraseña es invalida" });
    }
  } else {
    res
      .status(400)
      .send({ msg: "No se encontro un usuario asociado a ese correo" });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;

  const tokenExpired = willExpireToken(refreshToken);

  if (tokenExpired) {
    res.status(200).send({ msg: "El token a expirado" });
  } else {
    const tokenDecoded = decodeToken(refreshToken);
    userModel
      .findOne({
        where: { idUser: tokenDecoded.idUser },
      })
      .then((userFinded) => {
        const userToken = createToken(userFinded);
        const refreshToken = createRefreshToken(userFinded);
        res.status(200).send({ token: userToken, refreshToken });
      })
      .catch(() => {
        res.status(400).send({ msg: "No se encontro al usuario" });
      });
  }
};
