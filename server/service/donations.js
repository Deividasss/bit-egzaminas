import { database } from "../database/connection.js";
export const getAll = async (crowdfunderId) => {
  try {
    return await database.Donations.findAll({
      where: { crowdfunderId },
      raw: true,
    });
  } catch {
    return false;
  }
};
export const getById = async (id) => {
  try {
    return await database.Donations.findByPk(id);
  } catch {
    return false;
  }
};

export const insert = async (data) => {
  try {
    const donations = new database.Donations(data);
    await donations.save();
    return donations.dataValues.id;
  } catch (e) {
    console.log(e);
    return false;
  }
};
export const _delete = async (id) => {
  try {
    await getById(id).destroy();
    return true;
  } catch {
    return false;
  }
};
