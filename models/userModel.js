const { DataTypes } = require("sequelize");
const db = require("../configs/dbConfig");
const recordatoriosModel = require("./recordatoriosModel");

const userModel = db.define("user", {
  idUser: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El nombre no puede estar vacio",
      },
      len: {
        args: [1, 15],
        msg: "El nombre no puede tener mas de 15 caracteres",
      },
    },
  },

  lastname: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El apellido no puede estar vacio",
      },
      len: {
        args: [1, 15],
        msg: "El apellido no puede tener mas de 15 caracteres",
      },
    },
  },

  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: {
      msg: "El usuario con ese email ya existe",
    },
    validate: {
      isEmail: {
        msg: "Agrega un correo electronico valido",
      },
      notEmpty: {
        msg: "El campo email no puede estar vacio",
      },
    },
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "El campo password no puede estar vacio",
      },
    },
  },

  role: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: "client",
  },

  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

userModel.hasMany(recordatoriosModel, {
  foreignKey: {
    name: "idUser",
    notNull: true,
  },
});

module.exports = userModel;
