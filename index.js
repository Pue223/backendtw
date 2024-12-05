import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
 

import getMetaRoutes from "./src/routes/excel.routes.js";




const app = express();
const corsOptions = {
  origin: ['https://my-project-psi-steel.vercel.app', 'https://another-frontend.com'],
};


app.use(cors(corsOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Obtener __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Rutas de la API

app.use('/api', getMetaRoutes);




// Iniciar el servidor
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
