import { Router } from "express";
import { createAppointment, getAppointments } from "../handlers/Appointments";
import { handleInputErrors } from "../middleware";

const router = Router()

router.get("/" , 
    handleInputErrors,
    getAppointments
)

router.post("/" ,
    handleInputErrors,
    createAppointment
)

export default router