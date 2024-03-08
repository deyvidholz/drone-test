import DeliveryController from "../controllers/DeliveryController.js";
const deliveryController = new DeliveryController();

import express from "express";
const router = express.Router();

router.post('/calculate', deliveryController.calculate.bind(deliveryController));


export default router;