import { DataTypes } from "sequelize";
import { users } from "./users.js";

export const crowdFunder = (sequelize) => {
  const schema = {
    name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    specialization: { type: DataTypes.STRING, allowNull: false },
    cf_image: { type: DataTypes.STRING, allowNull: false },
    servise_name: { type: DataTypes.TEXT, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    approved: { type: DataTypes.INTEGER },
    success: { type: DataTypes.INTEGER },
  };

  const CrowdFunder = sequelize.define("Meistrai", schema);
  const Users = users(sequelize);

  Users.hasOne(CrowdFunder);
  CrowdFunder.belongsTo(Users);

  return CrowdFunder;
};
