import { Router } from "express";
import getServiciosHandler from "../handlers/ServiceTypeService";
import { handleInputErrors } from "../middleware";

const router = Router();

router.get("/", 
   getServiciosHandler,
   handleInputErrors
);

export default router;