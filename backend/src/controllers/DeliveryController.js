import DeliveryService from "../services/DeliveryService.js";

export default class DeliveryController {

    _service = new DeliveryService();

    async calculate({ body }, response) {
        try {
            const { drones } = body;
            const result = this._service.process(drones);
            return response.json(result);
        } catch (error) {
            console.error(error.message);
            return response.status(400).json({ error: error.message });
        }
    }

}
