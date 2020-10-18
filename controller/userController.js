const userModel = require("../models/userModel");

exports.allUser = async (req, res) => {
  const users = await userModel.findAll();
  //Entrega un arreglo, lo validas con users.length

  res.status(200).send({ users });
};

exports.findUser = async (req, res) => {
  const { id } = req.params;

  //const user = await userModel.findByPk(id);
  const user = await userModel.findOne({ where: { idUser: id } });
  //Entrega un objeto sino un null si no lo encuentra

  if (user) {
    res.status(200).send(user.dataValues);
  } else {
    res.status(400).send({ msg: `No encontramos un usuario con el id ${id}` });
  }
};

exports.createUser = async (req, res) => {
  const newUser = {
    name: "oscar",
    lastname: "Valenzuela",
    email: "oavr.18@gmail.com",
    password: "123456789",
    active: true,
  };

  try {
    //Entrega un objeto create.dataValues
    const create = await userModel.create(newUser);
    res.status(200).send({ msg: "Usuario creado satisfactoriamente" });
  } catch (error) {
    res.status(400).send({ msg: error.errors[0].message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  //Entrega un true o false
  const userDeleted = await userModel.destroy({ where: { idUser: id } });

  if (userDeleted) {
    res.status(200).send({ msg: "Usuario eliminado satisfactoriamente" });
  } else {
    res.status(400).send({ msg: "No se encontro el usuario" });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    //Entrega un numero de rows actualizadas
    //y un 0 si no se actualizaron rows
    //El try y catch se ocupa por el tema de actualziacion de varibales
    const userUpdated = await userModel.update(
      { token: "12132" },
      { where: { idUser: id } }
    );

    if (userUpdated[0]) {
      res.status(200).send({ msg: "Usuario Actualizado satisfactoriamente" });
    } else {
      res.status(400).send({ msg: "No se encontro el usuario" });
    }
  } catch (error) {
    res.status(400).send({ msg: errors.errors[0].message });
  }
};
