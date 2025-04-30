import { Router } from "express";
import { createVehicle, getVehicle, getVehicleById, updateVehicle, deleteVehicle } from "../handlers/Vehicle";
import { handleInputErrors } from "../middleware";
import { body, param } from "express-validator";

const router = Router();

// Obtener todos los vehículos
router.get("/", 
    getVehicle
);

// Obtener un vehículo por ID
router.get("/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getVehicleById
);

// Crear vehículo
router.post("/", 
    body("patente")
        .notEmpty().withMessage("La patente es obligatoria")
        .matches(/^[A-Z0-9]+$/).withMessage("La patente solo puede contener letras y números"),
    
    body("nroChasis")
        .notEmpty().withMessage("El número de chasis es obligatorio")
        .matches(/^[A-Z0-9]+$/).withMessage("El número de chasis solo puede contener letras y números"),

    body("marca")
        .notEmpty().withMessage("La marca es obligatoria")
        .isLength({ min: 2, max: 50 }).withMessage("La marca debe tener entre 2 y 50 caracteres"),

    body("modelo")
        .notEmpty().withMessage("El modelo es obligatorio")
        .isLength({ min: 2, max: 50 }).withMessage("El modelo debe tener entre 2 y 50 caracteres"),

    body("año")
        .notEmpty().withMessage("El año es obligatorio")
        .isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage("El año debe ser válido"),
    body("motor")
        .notEmpty().withMessage("El motor es obligatorio"),
    body("color")
        .optional()
        .isLength({ min: 2, max: 30 }).withMessage("El color debe tener entre 2 y 30 caracteres"),

    body("clienteId")
        .notEmpty().withMessage("El ID del cliente es obligatorio")
        .isInt().withMessage("El ID del cliente debe ser un número entero"),

    handleInputErrors,
    createVehicle
);

// Actualizar vehículo por ID
router.put("/:id", 
    param("id").isInt().withMessage("ID no válido"),
    body("patente").optional().matches(/^[A-Z0-9]+$/).withMessage("La patente solo puede contener letras y números"),
    body("nroChasis").optional().matches(/^[A-Z0-9]+$/).withMessage("El número de chasis solo puede contener letras y números"),
    body("marca").optional().isLength({ min: 2, max: 50 }).withMessage("La marca debe tener entre 2 y 50 caracteres"),
    body("modelo").optional().isLength({ min: 2, max: 50 }).withMessage("El modelo debe tener entre 2 y 50 caracteres"),
    body("año").optional().isInt({ min: 1900, max: new Date().getFullYear() + 1 }).withMessage("El año debe ser válido"),
    body("color").optional().isLength({ min: 2, max: 30 }).withMessage("El color debe tener entre 2 y 30 caracteres"),
    body("clienteId").optional().isInt().withMessage("El ID del cliente debe ser un número entero"),
    handleInputErrors,
    updateVehicle
);

// Eliminar vehículo por ID
router.delete("/:id", 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors, 
    deleteVehicle
);

export default router;
