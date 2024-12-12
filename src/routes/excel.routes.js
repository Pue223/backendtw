import express from 'express';

import { getTotalImporte,getIngresosFechas} from "../controller/excel.controller.js";


const router = express.Router();
 
router.get('/totalmeta',getTotalImporte);
router.get('/ingresos',getIngresosFechas);
 



export default router;
    

 

