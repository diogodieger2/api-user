import express, { json } from "express";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();
const PORT = 3001;
app.use(
  cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log("APP INICIALIZADO COM SUCESSO", PORT);
});
