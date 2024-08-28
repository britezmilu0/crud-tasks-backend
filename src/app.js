import express from 'express'; //ASI TENGO QUE COLOCAR EN TODOS LOS COSNT REQUIRE, Y A LOS ARCHIVOS QUE TENGO EN JS AGREGARLE .JS 
import { connectDb } from './bd.js';
import {taskRouter} from "./serv/src/routes/tasks.routes.js";

const app = express();

app.use(express.json());

app.use(taskRouter)



app.listen(3000, async () => {
    await connectDb();
    console.log("servidor corriendo en el puerto 3000");
})