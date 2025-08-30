import express, { json } from "express"
import userRoutes from "./routes/userRoutes"
const app = express();
const PORT = 3001

app.use(express.json())
app.use('/users', userRoutes)



app.listen(PORT, () => {
    console.log('APP INICIALIZADO COM SUCESSO', PORT)
})

