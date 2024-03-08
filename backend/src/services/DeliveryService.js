import { v4 as uuidv4 } from 'uuid';

export default class DeliveryService {

    sortDrones(a, b) {
        return a.capacity - b.capacity;
    }

    process(dataInput) {
        try {
            const { drones: unsortedDrones, locations: unsortedLocations } = this.parse(dataInput);
            const locations = unsortedLocations.sort((a, b) => b.weight - a.weight);
            const drones = unsortedDrones.sort(this.sortDrones).map((drone) => ({ ...drone, id: uuidv4() }));
            const trips = this.calculate(drones, drones, locations);

            const dronesObj = trips.reduce((accumulator, trip) => {
                if (!accumulator[trip.id]) {
                    accumulator[trip.id] = {
                        name: trip.name,
                        maxWeight: trip.maxWeight,
                        trips: []
                    };
                }

                accumulator[trip.id].trips.push(trip.items);
                return accumulator;
            }, {})
            return Object.keys(dronesObj).map((key) => dronesObj[key]);
        } catch (error) {
            throw error;
        }
    }

    calculate(dronesOriginal, drones, locations) {
        const trips = drones
            .map((item) => ({ ...item, items: [], capacity: item.maxWeight }))
            .sort(this.sortDrones);

        for (const location of locations) {
            const drone = trips.find((item) => item.capacity >= location.weight);
            if (!drone) {
                const canAnyDroneCarry = trips.find((item) => item.maxWeight >= location.weight);
                if (!canAnyDroneCarry) throw new Error(`There is no drone that can carry location ${location.name}.`)

                const droneIndex = trips.length % dronesOriginal.length;
                return this.calculate(dronesOriginal, [...trips, { ...dronesOriginal[droneIndex] }], locations);
            }

            drone.items.push(location);
            drone.capacity -= location.weight;
            trips.sort(this.sortDrones);
        }

        return trips;
    }

    parse(dataInput) {
        const droneString = dataInput.slice(0, dataInput.indexOf("\n"));
        const locationString = dataInput.slice(dataInput.indexOf("\n") + 1);

        const drones = droneString.split(",").reduce((accumulator, item, index) => {
            if (index % 2 === 0) {
                const drone = {
                    name: item.trim()
                };
                accumulator.push(drone);
            } else {
                accumulator[accumulator.length - 1].maxWeight = parseFloat(item.trim());
            }
            return accumulator;
        }, []);

        if (drones?.length > 2) throw new Error("The maximum number of drones in a squad is 100");

        const locations = locationString.split("\n").reduce((accumulator, item) => {
            const [name, weight] = item.split(",");
            if (name && weight)
                accumulator.push({
                    name: name.trim(),
                    weight: parseFloat(weight.trim())
                });

            return accumulator;
        }, [])

        return { drones, locations };
    }
}