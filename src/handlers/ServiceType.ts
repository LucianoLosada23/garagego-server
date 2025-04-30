import { Response , Request } from "express";
import TipoServicio from "../models/ServiceType.model";


// Handler para obtener todos los tipos de servicio
export const getServiceTypes = async (req: Request, res: Response) => {
  try {
    // Obtener todos los tipos de servicio
    const tiposServicio = await TipoServicio.findAll();

    // Verificar si hay tipos de servicio
    if (tiposServicio.length === 0) {
      return res.status(404).json({ message: "No hay tipos de servicio disponibles" });
    }

    // Responder con los tipos de servicio encontrados
    res.status(200).json(tiposServicio);
  } catch (error) {
    // Manejo de errores
    console.error("Error fetching tipos de servicio:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
