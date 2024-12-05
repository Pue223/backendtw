import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
 

import getMetaRoutes from "./src/routes/excel.routes.js";




const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de la API

app.use('/api', getMetaRoutes);




// Iniciar el servidor
const PORT = process.env.PORT || 4001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
});