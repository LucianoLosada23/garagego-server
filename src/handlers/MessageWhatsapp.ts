import { Request, Response } from 'express';
import { sendTestMessage } from '../services/sendWhatsAppReminder';

export const handleSendTestMessage = async (req: Request, res: Response) => {
  try {
    await sendTestMessage();
    res.status(200).send('Mensaje de prueba enviado');
  } catch (error) {
    res.status(500).send('Error al enviar mensaje');
  }
};