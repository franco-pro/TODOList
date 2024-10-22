import { DataTypes, Model } from "sequelize";
import sequelize from "../bd_connexion/connection";

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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, modelName: "Task" }
);

export default Task;
