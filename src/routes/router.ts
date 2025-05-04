import { Router } from "express";
import clientRoutes from "./clientRoutes";
import vehicleRoutes from "./vehicleRoutes";
import serviceTypeRoutes from "./serviceTypeRoutes";
import serviceTypeServiceRoutes from "./serviceTypeServiceRoutes";
import servicesRoutes from "./servicesRoutes";
import replacementRoutes from "./replacementRoutes";
import messageWhatsappRoutes from "./messageWhatsappRoutes";
import appointmentsRoutes from "./appointmentsRoutes";

const router = Router();

// Usar las rutas de cliente
router.use("/clients", clientRoutes);

// Usar las rutas de vehículo
router.use("/vehicles", vehicleRoutes);

// Usar las rutas de servicios
router.use("/services", servicesRoutes);

// Usar las rutas de tipo de servicios
router.use("/typeService", serviceTypeRoutes);

// 
router.use("/serviceTypeService", serviceTypeServiceRoutes);

router.use("/replacements", replacementRoutes)

// ruta de citas
router.use("/appointments" , appointmentsRoutes)


//ruta para whatsapp
router.use("/whatsapp", messageWhatsappRoutes)
export default router;
