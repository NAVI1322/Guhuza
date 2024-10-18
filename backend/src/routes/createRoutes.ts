
import express from 'express';
import { AddJob } from '../controllers/addjobcontroller';




const router = express.Router();

router.post('/createjob',AddJob );



export default router;
