import { Request, Response } from "express";
import Servicio from "../models/Service.model";
import TipoServicio from "../models/ServiceType.model";
import Repuesto from "../models/Repuesto.model";
import ServicioTipoServicio from "../models/ServicioTipoServicio.model";
import Vehiculo from "../models/Vehicle.model";

// Handler para obtener un servicio con los tipos de servicio asociados
const getServiciosHandler = async (req: Request, res: Response) => {
  try {
    const servicios = await Servicio.findAll({
      include: [
        {
          model: TipoServicio,
          as: "tiposServicio", // Asegurate que este alias coincida con tu relación belongsToMany
          through: { attributes: [] }, // Para no mostrar la tabla intermedia
        },
        {
          model: Repuesto,
          as: "repuesto", // Asegurate que coincida con el alias del hasMany
        },
        {
          model: Vehiculo,
          as: "vehiculo", // Asegurate que coincida con el alias del belongsTo
        },
      ],
    });

    res.status(200).json(servicios);
  } catch (error) {
    console.error("Error al obtener los servicios:", error);
    res.status(500).json({ message: "Error al obtener los servicios", error });
  }
};

export default getServiciosHandler;