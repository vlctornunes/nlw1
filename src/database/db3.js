//importar a dependencia
const sqlite3 = require("sqlite3").verbose()

//iniciar o objeto pras operações do DB
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db
//utiliar o objeto de banco de dados para nossas operações
