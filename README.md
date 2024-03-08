# Drone Delivery Service

Drone Delivery Service is a project built using Node.js and Vue.js

## Solution

The proposed solution to the Drone Delivery Service Coding Test is to use the Best Fit Algorithm. It consists of sorting all locations by descending weight and looping through all locations to assign it to the drone with the least capacity that can handle it. Before assigning each item, it sorts all drones by the ascending capacity left.

If after running the process, there is still left locations unassigned, the process will be repetead with one more trip to one of the drones, starting from the one of the least capacity. If needed, the algorithm will keep adding more trips to drones one by one until it can handle all locations.

Additionally, whenever a location cannot be fit to any drone by their capacity left, the algorithm also checks if the location weight is greater then the max weight of all drones to throw an error.

## Getting started

Clone the project and spin up docker containers from docker-compose.yml. You will need to have Docker installed.

```sh
docker compose up
```
Then you should open up two terminals to run each application on a different one:

```sh
docker exec drone_frontend npm run dev
```

```sh
docker exec drone_api npm run dev
```

The frontend application is running on port 8200, so you can access it through http://localhost:8200. The backend is set to run on port 8210.
