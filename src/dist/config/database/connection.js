"use strict";
//connexion avec mysql nativemnt
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeDB = void 0;
// import mysql from "mysql";
// export const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "todolist",
// });
// db.connect((err) => {
//   if (err) {
//     throw new Error(err.stack);
//   } else {
//     console.log("connected successfully", db.threadId);
//   }
// });
//utiliser l'ORM sequelize
const sequelize_1 = require("sequelize");
const sequelizeDB = new sequelize_1.Sequelize("todolist", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: console.log,
});
exports.sequelizeDB = sequelizeDB;
//verifier la connexion
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelizeDB.authenticate();
        yield sequelizeDB.sync({ force: false, alter: true });
        console.log("connected successfully !");
    }
    catch (error) {
        throw new Error(error.stack);
        console.log(`something wrong !`);
    }
}))();
