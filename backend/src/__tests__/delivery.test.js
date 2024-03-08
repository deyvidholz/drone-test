// import DeliveryService from "../services/DeliveryService.js";

// const service = new DeliveryService();

// describe("when testing delivery module", () => {
//     it("should abc", () => {
//         const input = `Drone A, 1000, Drone B, 740
//         Neves, 500
//         Rio Preto, 700
//         Mirassol, 450`;
//         const res = service.calculate(input);
//         expect(res).toBeTruthy();
//     })
// })
import { sum } from '../sum';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});