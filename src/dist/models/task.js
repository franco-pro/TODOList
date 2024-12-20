"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("../config/database/connection");
//definition du modele
class Task extends sequelize_1.Model {
}
Task.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    urgent: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    important: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize: connection_1.sequelizeDB,
    modelName: "task",
    tableName: "task",
    timestamps: true,
});
exports.default = Task;
