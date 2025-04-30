import { Router } from "express";
import { checkCuitExists, createClient, deleteClient, getClientById, getClients, updateClient } from "../handlers/Client"
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware";

const router = Router();

router.get("/", getClients);

router.get('/check-cuit/:cuit', checkCuitExists);

router.get("/:id", getClientById ,
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getClientById
);

router.post("/", 
    // Validaciones dentro del router
    body("name")
      .notEmpty().withMessage("El nombre del cliente no puede ir vacío")
      .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre solo puede contener letras, espacios y acentos"),
    body("lastname")
      .notEmpty().withMessage("El apellido del cliente no puede ir vacío")
      .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El apellido solo puede contener letras, espacios y acentos"),
    body("email")
        .isEmail().withMessage("El email no es válido")
        .normalizeEmail().withMessage("El email debe estar en un formato estándar"),
    body("phone")
        .matches(/^\d+$/).withMessage("El teléfono debe ser un número")
        .isLength({ min: 10, max: 15 }).withMessage("El teléfono debe tener entre 10 y 15 dígitos"),
    body("cuit")
        .matches(/^\d+$/).withMessage("El cuit debe ser un número")
        .isLength({ min: 11, max: 11 }).withMessage("El cuit debe tener exactamente 11 dígitos"),
    handleInputErrors,
    createClient
);

router.put("/:id",
    param("id").isInt().withMessage("ID no válido"),
    body("name")
      .notEmpty().withMessage("El nombre del cliente no puede ir vacío")
      .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre solo puede contener letras, espacios y acentos"),
    body("lastname")
      .notEmpty().withMessage("El apellido del cliente no puede ir vacío")
      .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
      .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El apellido solo puede contener letras, espacios y acentos"),
    body("email")
      .isEmail().withMessage("El email no es válido")
      .normalizeEmail(),
    body("phone")
      .isNumeric().withMessage("El teléfono debe ser un número")
      .isLength({ min: 10, max: 15 }).withMessage("El teléfono debe tener entre 10 y 15 dígitos"),
    body("cuit")
      .isNumeric().withMessage("El cuit debe ser un número")
      .isLength({ min: 11, max: 11 }).withMessage("El cuit debe tener exactamente 11 dígitos"),
    handleInputErrors,
    updateClient
  );
  

router.delete("/:id",
    param("id").isInt().withMessage("ID no válido"), 
    handleInputErrors,
    deleteClient
)

export default router;