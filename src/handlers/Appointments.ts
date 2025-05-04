import { Response, Request } from "express";
import Appointment from "../models/Appointments.model";
import TipoServicio from "../models/ServiceType.model";
import Vehiculo from "../models/Vehicle.model";
import Client from "../models/Client.model";

export const getAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        TipoServicio,
        {
          model: Vehiculo,
          include: [Client], // Aquí anidamos el cliente dentro del vehículo
        },
      ],
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los turnos' });
  }
};


export const createAppointment = async (req : Request, res : Response) => {
  try {
    const {
      vehicleId,
      hora,
      date,
      status,
      tipoServicioIds // <- Array de IDs, ej: [1, 3, 5]
    } = req.body;

    // 1. Crear la cita
    const appointment = await Appointment.create({ vehicleId, date, status , hora});

    // 2. Asociar servicios a través de la tabla intermedia
    if (tipoServicioIds && Array.isArray(tipoServicioIds)) {
      await appointment.$set('tipoServicios', tipoServicioIds);
    }

    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear el turno' });
  }
};
