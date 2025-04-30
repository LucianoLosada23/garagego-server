import { Response , Request } from "express";
import Vehiculo from "../models/Vehicle.model";
import Client from "../models/Client.model";
import { Op } from "sequelize";

export const getVehicle = async (req: Request, res: Response) => {
  try {
    const vehicle = await Vehiculo.findAll({
      attributes: ['id', 'marca', 'modelo', 'patente', 'nroChasis', 'color', 'año', 'clienteId', 'motor'], // Solo incluye los atributos que deseas
      include: [
        {
          model: Client,
          attributes: ['name', 'lastname'], // Solo incluye nombre y apellido
        },
      ],
    });
    res.status(200).json(vehicle);
  } catch (error) {
    console.error("Error fetching vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getVehicleById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehiculo.findByPk(id, {
      include: [{ model: Client }],  
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    res.status(200).json({ data: vehicle });
  } catch (error) {
    console.error("Error fetching vehicle by id:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createVehicle = async (req: Request, res: Response) => {
  const { patente, nroChasis } = req.body;

  try {
    // Validación: verificar si ya existe un vehículo con esa patente o chasis
    const existingVehicle = await Vehiculo.findOne({
      where: {
        // Usamos OR lógico: si coincide patente o nroChasis
        [Op.or]: [
          { patente },
          { nroChasis }
        ]
      },
    });

    if (existingVehicle) {
      return res.status(400).json({
        message: "Ya existe un vehículo registrado con esa patente o número de chasis.",
      });
    }

    // Crear y guardar
    const newVehicle = new Vehiculo(req.body);
    const savedVehicle = await newVehicle.save();

    res.status(201).json({ data: savedVehicle });
  } catch (error) {
    console.error("Error creating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const vehicle = await Vehiculo.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    // Actualizar el vehículo
    const updatedVehicle = await vehicle.update(req.body);

    res.status(200).json({ data: updatedVehicle });
  } catch (error) {
    console.error("Error updating vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteVehicle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const vehicle = await Vehiculo.findByPk(id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }

    await vehicle.destroy();

    res.status(200).json({ message: "Vehículo eliminado exitosamente" });
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
