import db from "./config/db";
import cors, { CorsOptions } from "cors"; // Importar cors para manejar CORS
import express from "express";
import router from "./routes/router";

console.log("desde server");

export async function conectionDB (){
    try {
        await db.authenticate() // Conectar a la base de datos
        await db.sync({ alter: true }) 
        console.log("Conectado a la base de datos")
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
    }
}

conectionDB() // Llamar a la funcion de conexion a la base de datos

const server = express() // Crear una instancia de express

const corsOptions : CorsOptions = {
    origin : function(origin , callback){
        if(origin === "http://localhost:5173" || origin === undefined ){
            callback(null , true)
        }else{
            callback(new Error("Error de CORS"))

        }
    }
} 


server.use(cors(corsOptions))


server.use(express.json())
server.use("/api" , router)
 
export default server