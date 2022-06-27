import { DataTypes } from "sequelize";

export const users = (sequelize) => {
  const schema = {
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.INTEGER, defaultValue: 0 },
  };

  return sequelize.define("Users", schema);
};
