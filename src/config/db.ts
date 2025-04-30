import { Sequelize } from "sequelize-typescript";

// Conexión a la base de datos
const db = new Sequelize("postgres://postgres:0804@localhost:5432/postgres", {
    models: [__dirname + "/../models/**/*"], // Ruta para cargar modelos automáticamente
    logging: false, // Desactiva el log de consultas SQL
});

export default db; 