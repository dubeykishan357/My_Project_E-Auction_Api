import express from 'express';
import * as BidController from '../controller/bid.controller.js'


var router = express.Router();



router.post("/save",BidController.save);

router.get("/fetch",BidController.fetch);



export default router;
