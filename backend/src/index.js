import express from "express";
import cors from "cors";
import deliveryRoutes from "./routes/delivery.js";
const app = express();

const port = 8210;

app.use(cors());
app.use(express.json());

app.use("/delivery", deliveryRoutes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})