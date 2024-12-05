import express from 'express';

import { getTotalImporte} from "../controller/excel.controller.js";


const router = express.Router();
 
router.get('/totalmeta',getTotalImporte);
 



export default router;
    

 

