import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../handlers/User";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router();

// 📌 GET all users
router.get("/", getUsers);

// 📌 GET user by id
router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getUserById
);

// 📌 POST create user
router.post(
  "/",
  body("name")
    .notEmpty().withMessage("El nombre no puede ir vacío")
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre solo puede contener letras, espacios y acentos"),
  body("lastname")
    .notEmpty().withMessage("El apellido no puede ir vacío")
    .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El apellido solo puede contener letras, espacios y acentos"),
  body("email")
    .isEmail().withMessage("El email no es válido")
    .normalizeEmail(),
  body("password")
    .notEmpty().withMessage("La contraseña no puede ir vacía")
    .isLength({ min: 6, max: 100 }).withMessage("La contraseña debe tener entre 6 y 100 caracteres"),
  body("phone")
    .matches(/^\d+$/).withMessage("El teléfono debe ser un número")
    .isLength({ min: 10, max: 15 }).withMessage("El teléfono debe tener entre 10 y 15 dígitos"),
  body("cuit")
    .matches(/^\d+$/).withMessage("El CUIT debe ser un número")
    .isLength({ min: 11, max: 11 }).withMessage("El CUIT debe tener exactamente 11 dígitos"),
  handleInputErrors,
  createUser
);

// 📌 PUT update user
router.put(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  body("name")
    .notEmpty().withMessage("El nombre no puede ir vacío")
    .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre solo puede contener letras, espacios y acentos"),
  body("lastname")
    .notEmpty().withMessage("El apellido no puede ir vacío")
    .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El apellido solo puede contener letras, espacios y acentos"),
  body("phone")
    .matches(/^\d+$/).withMessage("El teléfono debe ser un número")
    .isLength({ min: 10, max: 15 }).withMessage("El teléfono debe tener entre 10 y 15 dígitos"),
  body("cuit")
    .matches(/^\d+$/).withMessage("El CUIT debe ser un número")
    .isLength({ min: 11, max: 11 }).withMessage("El CUIT debe tener exactamente 11 dígitos"),
  handleInputErrors,
  updateUser
);

// 📌 DELETE user
router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteUser
);

export default router;
