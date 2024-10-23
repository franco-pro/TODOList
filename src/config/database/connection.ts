//connexion avec mysql nativemnt

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
import { Sequelize } from "sequelize";
const sequelizeDB = new Sequelize("todolist", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: console.log,
});

//verifier la connexion
(async () => {
  try {
    await sequelizeDB.authenticate();
    await sequelizeDB.sync({ force: false, alter: true });
    console.log("connected successfully !");
  } catch (error: any) {
    throw new Error(error.stack);
    console.log(`something wrong !`);
  }
})();

export { sequelizeDB };
