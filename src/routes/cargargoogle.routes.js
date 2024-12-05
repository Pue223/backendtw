import express from 'express';

import { getDocPDF,googlecontroler} from "../controller/cargararchivo.controller.js";


const router = express.Router();
 
router.get('/redirect',googlecontroler);
 



export default router;
    

 

