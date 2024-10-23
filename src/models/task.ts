import { DataTypes, Model } from "sequelize";
import { sequelizeDB } from "../config/database/connection";

//definition du modele
class Task extends Model {
  public id!: number;
  public title!: string;
  public description?: string;
  public completed!: boolean;
  public readonly createdAt!: Date;
}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelizeDB,
    modelName: "task",
    tableName: "task",
    timestamps: true,
  }
);

export default Task;
