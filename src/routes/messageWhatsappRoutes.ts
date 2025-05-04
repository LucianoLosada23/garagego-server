import { Router } from 'express';
import { handleSendTestMessage } from '../handlers/MessageWhatsapp';
import { handleInputErrors } from '../middleware';

const router = Router();

router.get('/enviar-mensaje', 
    handleInputErrors,
    handleSendTestMessage
);

export default router;