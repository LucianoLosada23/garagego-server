import server from "./server";

console.log("desde index");

const port = process.env.PORT || 3000; // Definir el puerto de la aplicacion

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`); // Mensaje de confirmacion
}); // Iniciar el servidor
