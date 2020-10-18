const recordatoriosModel = require("../models/recordatoriosModel");
const userModel = require("../models/userModel");
const moment = require("moment");
const { Op } = require("sequelize");

const getRecordatorios = (
  id,
  importance = null,
  active = true,
  limit = null
) => {
  if (active) {
    const recordatoriosActive = recordatoriosModel.findAll({
      where: {
        importance,
        idUser: id,
        active: true,
        date: {
          [Op.gte]: new Date(),
        },
      },
      order: [["date", "DESC"]],
      limit,
    });
    return recordatoriosActive;
  } else {
    if (importance) {
      const recordatoriosInactiveWithImportance = recordatoriosModel.findAll({
        where: {
          idUser: id,
          importance,
          [Op.or]: [
            { active: false },
            {
              date: {
                [Op.lt]: new Date(),
              },
            },
          ],
        },
        order: [["date", "DESC"]],
        limit,
      });
      return recordatoriosInactiveWithImportance;
    } else {
      const recordatoriosInactive = recordatoriosModel.findAll({
        where: {
          idUser: id,
          [Op.or]: [
            { active: false },
            {
              date: {
                [Op.lt]: new Date(),
              },
            },
          ],
        },
        order: [["date", "DESC"]],
        limit,
      });

      return recordatoriosInactive;
    }
  }
};

exports.bulkRecordatorios = async (req, res) => {
  const { id } = req.params;

  const findUser = await userModel.findByPk(id);
  if (findUser) {
    const today = moment(new Date()).add(5, "days").format("YYYY-MM-DD");
    const bulk = await recordatoriosModel.bulkCreate([
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "normal",
        date: today,
        active: 0,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "veryImportant",
        date: today,
        active: 0,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "veryImportant",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "veryImportant",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "veryImportant",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "veryImportant",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "veryImportant",
        date: today,
        active: 0,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "veryImportant",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "important",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "important",
        date: "2020-10-15",
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "important",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "important",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "important",
        date: today,
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "important",
        date: "2020-10-15",
        active: 1,
        idUser: id,
      },
      {
        title: "recordatorio",
        importance: "important",
        date: today,
        active: 1,
        idUser: id,
      },
    ]);

    res.status(200).send({ bulk: true });
  } else {
    res.status(400).send({
      msg: `No se encontro al usuario con la id ${id}`,
    });
  }
};

exports.getRecordatoriosInicio = async (req, res) => {
  //Validacion del token
  const id = req.headers.token;
  let variables = 5;

  //getRecordatorios(id, importance = null, active= true, limit = null)

  const veryImportant = await getRecordatorios(id, "veryImportant", true, 5);

  const important = await getRecordatorios(id, "important", true, 3);

  variables = variables - important.length;

  const normal = await getRecordatorios(id, "normal", true, variables);

  res.status(200).send({
    veryImportant,
    importantAndNormal: [...important, ...normal],
  });
};

exports.countRecordatoriosInfo = async (req, res) => {
  const id = req.headers.token;

  const getTotalRecordatorios = await recordatoriosModel.count({
    where: {
      idUser: id,
      active: true,
      date: {
        [Op.gte]: new Date(),
      },
    },
  });

  const getRecordatoriosVeryImportant = await recordatoriosModel.count({
    where: {
      idUser: id,
      active: true,
      importance: "veryImportant",
      date: {
        [Op.gte]: new Date(),
      },
    },
  });

  const getRecordatoriosImportant = await recordatoriosModel.count({
    where: {
      idUser: id,
      active: true,
      importance: "important",
      date: {
        [Op.gte]: new Date(),
      },
    },
  });

  const getRecordatoriosNormal = await recordatoriosModel.count({
    where: {
      idUser: id,
      active: true,
      importance: "normal",
      date: {
        [Op.gte]: new Date(),
      },
    },
  });

  res.status(200).send({
    total: getTotalRecordatorios,
    veryImportant: getRecordatoriosVeryImportant,
    important: getRecordatoriosImportant,
    normal: getRecordatoriosNormal,
  });
};

exports.getTotalRecordatoriosList = async (req, res) => {
  const id = req.headers.token;

  const totalRecordatoriosVeryImportant = await getRecordatorios(
    id,
    "veryImportant",
    true
  );

  const totalRecordatoriosImportant = await getRecordatorios(
    id,
    "important",
    true
  );

  const totalRecordatoriosNormal = await getRecordatorios(id, "normal", true);

  const totalRecordatoriosInactiveAndPast = await getRecordatorios(
    id,
    null,
    false
  );

  res.status(200).send({
    totalRecordatorios: [
      ...totalRecordatoriosVeryImportant,
      ...totalRecordatoriosImportant,
      ...totalRecordatoriosNormal,
    ],
    totalRecordatoriosInactiveAndPast,
  });
};

exports.getSearchRecordatorios = async (req, res) => {
  const id = req.headers.token;
  const { search } = req.query;

  const recordatoriosSearch = await recordatoriosModel.findAll({
    where: {
      idUser: id,
      [Op.or]: [
        {
          title: {
            [Op.like]: `${search}%`,
          },
        },
        {
          title: {
            [Op.like]: `%${search}%`,
          },
        },
      ],
    },
    order: [["date", "DESC"]],
  });

  res.status(200).send({ recordatoriosSearch });
};

exports.addRecordatorio = async (req, res) => {
  const id = req.headers.token;
  const { recordatorio } = req.body;
  const newRecordatorio = {
    ...recordatorio,
    idUser: id,
  };

  try {
    await recordatoriosModel.create(newRecordatorio);
    res.status(201).send({ create: true });
  } catch (error) {
    res.status(400).send({ msg: error.errors[0].message });
  }
};

exports.deleteRecordatorio = async (req, res) => {
  const id = req.headers.token;
  const { idRecordatorio } = req.params;

  const findRecordatorio = await recordatoriosModel.findByPk(idRecordatorio);

  if (findRecordatorio) {
    if (findRecordatorio.idUser == id) {
      const recordatorioDeleted = await recordatoriosModel.destroy({
        where: { id: idRecordatorio },
      });
      recordatorioDeleted
        ? res.status(200).send({ delete: true })
        : res.status(500).send({ msg: "Lo siento, intentelo mas tarde" });
    } else {
      res.status(400).send({
        msg: "Lo siento, no tiene permiso para eliminar ese recordatorio",
      });
    }
  } else {
    res.status(400).send({ msg: "Lo siento, el recordatorio no existe" });
  }
};

exports.updateRecordatorio = async (req, res) => {
  const id = req.headers.token;
  const { idRecordatorio } = req.params;
  const { recordatorio } = req.body;

  const findRecordatorio = await recordatoriosModel.findByPk(idRecordatorio);

  if (findRecordatorio) {
    if (findRecordatorio.idUser == id) {
      const recordatorioTemp = { ...findRecordatorio, ...recordatorio };
      try {
        const recordatorioUpdated = await recordatoriosModel.update(
          { ...recordatorioTemp },
          { where: { id: idRecordatorio } }
        );
        recordatorioUpdated
          ? res.status(200).send({ updated: true })
          : res.status(500).send({ msg: "Lo siento, intentelo mas tarde" });
      } catch (error) {
        res.status(400).send({ msg: errors.errors[0].message });
      }
    } else {
      res.status(400).send({
        msg: "Lo siento, no tiene permiso para actualizar este recordatorio",
      });
    }
  } else {
    res.status(400).send({ msg: "Lo siento, el recordatorio no existe" });
  }
};
