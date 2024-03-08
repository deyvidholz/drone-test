import axios from "axios";

// Pode ser algum servidor executando localmente:
// http://localhost:3000



const api = axios.create({
  baseURL: "http://localhost:8210",
});

export default api;
