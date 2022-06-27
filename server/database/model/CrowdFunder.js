import { DataTypes } from "sequelize";
import { users } from "./users.js";

export const crowdFunder = (sequelize) => {
  const schema = {
    headline: { type: DataTypes.STRING, allowNull: false },
    cf_image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    cf_goal: { type: DataTypes.INTEGER, allowNull: false },
    approved: { type: DataTypes.INTEGER },
    success: { type: DataTypes.INTEGER },
  };

  const CrowdFunder = sequelize.define("CrowdFunder", schema);
  const Users = users(sequelize);

  Users.hasOne(CrowdFunder);
  CrowdFunder.belongsTo(Users);

  return CrowdFunder;
};
