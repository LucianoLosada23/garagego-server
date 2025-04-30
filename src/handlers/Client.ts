import { Response, Request } from "express";
import Client from "../models/Client.model";

export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll({
      attributes: ['id','cuit', 'name', 'lastname', 'email', 'phone', 'isActive'],
      order: [['lastname', 'ASC']], // Ordena por apellido de forma ascendente
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Error fetching client by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const client = new Client(req.body);
    const saveClient = await client.save();
    res.status(201).json({ data: saveClient });
  } catch (error) {
    console.error("Error creating client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await client.update(req.body);
    res.status(200).json({ message: "Cliente actualizado", data: client });
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    await client.destroy();
    res.status(200).json({ message: "Cliente eliminado" });
  } catch (error) {
    console.error("Error deleting client:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export async function checkCuitExists(req : Request, res : Response) {
  const { cuit } = req.params;
  try {
    // Verificar si el CUIT ya existe en la base de datos
    const client = await Client.findOne({ where: { cuit } });
    if (client) {
      return res.json({ exists: true });
    }
    return res.json({ exists: false });
  } catch (error) {
    console.error('Error al verificar el CUIT:', error);
    return res.status(500).json({ message: 'Error al verificar el CUIT' });
  }
}

