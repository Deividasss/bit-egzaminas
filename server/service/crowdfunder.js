import { database } from "../database/connection.js";

export const getAll = async (conditions = {}) => {
  try {
    conditions.raw = true;
    return await database.CrowdFunder.findAll(conditions);
  } catch {
    return false;
  }
};

export const getById = async (id) => {
  try {
    return await database.CrowdFunder.findByPk(id);
  } catch {
    return false;
  }
};

export const getByUserId = async (id) => {
  try {
    return await database.CrowdFunder.findAll({
      where: {
        UserId: id,
      },
    });
  } catch {
    return false;
  }
};

export const insert = async (data) => {
  try {
    const crowdfunder = new database.CrowdFunder(data);
    await crowdfunder.save();

    return crowdfunder.dataValues.id;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const exists = async (fields = {}) => {
  try {
    const count = await database.Profile.count({
      where: fields,
    });
    return count != 0;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const _delete = async (id) => {
  try {
    const CrowdFunder = await getById(id);
    await CrowdFunder.destroy();
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const _update = async (id, data) => {
  try {
    console.log(id, data);
    await database.CrowdFunder.update(data, { where: { id } });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};
