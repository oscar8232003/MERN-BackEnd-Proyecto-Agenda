const recordatoriosModel = require("../models/recordatoriosModel");
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
  const today = moment(new Date()).add(5, "days").format("YYYY-MM-DD");
  const bulk = await recordatoriosModel.bulkCreate([
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "normal",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "veryImportant",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "veryImportant",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "veryImportant",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "veryImportant",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "veryImportant",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "veryImportant",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "veryImportant",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "important",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "important",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "important",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "important",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "important",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "important",
      date: today,
      active: 1,
      idUser: 1,
    },
    {
      title: "recordatorio",
      importance: "important",
      date: today,
      active: 1,
      idUser: 1,
    },
  ]);

  res.status(200).send({ bulk: true });
};

exports.getRecordatoriosInicio = async (req, res) => {
  const { id } = req.body;
  let variables = 5;

  //getRecordatorios(id, importance = null, active= true, limit = null)

  const veryImportant = await getRecordatorios(id, "veryImportant", true, 5);

  const important = await getRecordatorios(id, "important", true, 3);

  variables = variables - important.length;

  const normal = await getRecordatorios(id, "normal", true, variables);

  res
    .status(200)
    .send({ veryImportant, importantAndNormal: [...important, ...normal] });
};

exports.countRecordatoriosInfo = async (req, res) => {
  const { id } = req.body;

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
  const { id } = req.body;

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
  const { id, search } = req.body;

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
