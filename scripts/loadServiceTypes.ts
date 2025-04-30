import db from "../src/config/db";  // Ajusta la ruta de acuerdo a tu estructura
import TipoServicio from "../src/models/ServiceType.model";  // Ajusta la ruta de acuerdo a tu estructura

const cargarTiposDeServicio = async () => {
  try {
    await db.sync();  // Asegúrate de sincronizar la base de datos antes de operar con los modelos

    const tipos = [
      { nombre: "Cambio de aceite" },
      { nombre: "Frenos" },
      { nombre: "Batería" },
      { nombre: "Suspensión" },
      { nombre: "Embrague" },
      { nombre: "Distribución" },
      { nombre: "Tren delantero" }
    ];

    await TipoServicio.bulkCreate(tipos);  // Inserta todos los tipos en la base de datos

    console.log("Tipos de servicio cargados correctamente.");
  } catch (error) {
    console.error("Error al cargar los tipos de servicio:", error);
  }
};

cargarTiposDeServicio();
