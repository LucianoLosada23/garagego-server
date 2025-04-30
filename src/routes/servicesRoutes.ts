import { Router } from "express";
import {getAllServices,getServiceById,createServicioHandler,updateService,deleteService} from "../handlers/Services"; // Ajustá la ruta si es diferente
import { handleInputErrors } from "../middleware";
import { param } from "express-validator";

const router = Router();

// Obtener todos los servicios
router.get("/", 
   getAllServices
);

// Obtener un servicio por ID
router.get("/:id", 
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    getServiceById
);

// Crear un nuevo servicio
router.post("/", 
    handleInputErrors,
    createServicioHandler
);

// Actualizar un servicio existente
router.put("/:id",
    param("id").isInt().withMessage("ID no válido"),
    handleInputErrors,
    updateService
);

// Eliminar un servicio
router.delete("/:id",
    param("id").isInt().withMessage("ID no válido"), 
    handleInputErrors, 
    deleteService
);

export default router;
