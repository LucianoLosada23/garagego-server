import { Router } from "express";
import { getServiceTypes } from "../handlers/ServiceType";
import { handleInputErrors } from "../middleware";


const router = Router();

router.get("/",
    getServiceTypes,
    handleInputErrors
)

export default router;