import { Request, Response } from "express";
import Servicio from "../models/Service.model";
import TipoServicio from "../models/ServiceType.model";

export const getAllServices = async (_req: Request, res: Response) => {
  try {
    const servicios = await Servicio.findAll();
    res.status(200).json(servicios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los servicios" });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servicio = await Servicio.findByPk(id);
    if (!servicio) return res.status(404).json({ error: "Servicio no encontrado" });
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el servicio" });
  }
};


export const createServicioHandler = async (req: Request, res: Response) => {
  try {
    const { descripcion, fecha, costo, vehiculoId, tiposServicioIds } = req.body;

    // Validación básica
    if (!descripcion || !fecha || !costo || !vehiculoId || !Array.isArray(tiposServicioIds)) {
      return res.status(400).json({ error: "Faltan datos obligatorios o tiposServicioIds inválido" });
    }

    // Crear el servicio
    const nuevoServicio = await Servicio.create({
      descripcion,
      fecha,
      costo,
      vehiculoId
    });

    // Asociar los tipos de servicio (muchos a muchos)
    await nuevoServicio.$set('tiposServicio', tiposServicioIds);

    // Traer el servicio con los tipos ya asociados para devolver al cliente
    const servicioConTipos = await Servicio.findByPk(nuevoServicio.id, {
      include: [TipoServicio]
    });

    res.status(201).json(servicioConTipos);
  } catch (error) {
    console.error("Error al crear el servicio:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

  

export const updateService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { descripcion, fecha, vehiculoId, tipoServicioId } = req.body;

    const servicio = await Servicio.findByPk(id);
    if (!servicio) return res.status(404).json({ error: "Servicio no encontrado" });

    await servicio.update({ descripcion, fecha, vehiculoId, tipoServicioId });
    res.status(200).json(servicio);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el servicio" });
  }
};

export const deleteService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servicio = await Servicio.findByPk(id);
    if (!servicio) return res.status(404).json({ error: "Servicio no encontrado" });

    await servicio.destroy();
    res.status(200).json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el servicio" });
  }
};
