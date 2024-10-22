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
const sequelize = new Sequelize("todolist", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

//verifier la connexion
async () => {
  try {
    await sequelize.authenticate();
    console.log("connected successfully !");
  } catch (error: any) {
    throw new Error(error.stack);
  }
};

export default sequelize;
