import axios from 'axios';

const API_KEY = '5746744';
const PHONE_NUMBER = '5492617049629';

export const sendTestMessage = async () => {
  const mensaje = 'Hola! Este es un recordatorio de tu cita en el taller para mañana a las 10:00 AM.';

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${PHONE_NUMBER}&text=${encodeURIComponent(mensaje)}&apikey=${API_KEY}`;
    const response = await axios.get(url);
    console.log('Mensaje enviado:', response.data);
  } catch (error) {
    console.error('Error al enviar WhatsApp:', error);
  }
};
