import { Router } from "express"; 
import { crearTarea, tareaId, actualizarId, eliminarTarea } from "../controllers/tasks.controller.js"
import { validarCrearTarea, validarActualizarTarea, validarListaTarea, validarEliminarTarea } from "../validation/taskValidation.js";
import { aplicarValidaciones } from "../applyValidations.js";

const taskRouter = Router(); 

taskRouter.get("/tasks/:id", validarListaTarea, tareaId)
taskRouter.post("/tasks", validarCrearTarea, aplicarValidaciones, crearTarea)
taskRouter.delete("/tasks", validarEliminarTarea, eliminarTarea)
taskRouter.put("/tasks/:id", validarActualizarTarea, actualizarId)

export { taskRouter }




