import { Request, Response } from "express";
import User from "../models/User.model";
import { hashPassword } from "../services/hashPassword";

// 📌 Crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    user.password = await hashPassword(user.password);

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario", error });
  }
};

// 📌 Obtener todos los usuarios
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuarios", error });
  }
};

// 📌 Obtener un usuario por ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario", error });
  }
};

// 📌 Actualizar un usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, lastname, phone, cuit } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({ name, lastname, phone, cuit });

    res.status(200).json({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      phone: user.phone,
      cuit: user.cuit,
      updateAt: user.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario", error });
  }
};

// 📌 Eliminar un usuario
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    await user.destroy();
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario", error });
  }
};
