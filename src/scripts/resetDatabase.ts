import db from "../config/db"; // ajustá el path según tu estructura

async function resetDatabase() {
  try {
    await db.sync({ force: true });
    console.log("🔥 Base de datos reseteada y tablas creadas de nuevo!");
  } catch (error) {
    console.error("❌ Error reseteando la base de datos:", error);
  } finally {
    await db.close();
  }
}

resetDatabase();
