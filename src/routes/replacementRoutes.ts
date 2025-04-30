import { Router } from "express";
import { handleInputErrors } from "../middleware";
import { createReplacement } from "../handlers/Replacement";

const router = Router();

router.post("/" ,
    handleInputErrors,
    createReplacement
)

export default router; 