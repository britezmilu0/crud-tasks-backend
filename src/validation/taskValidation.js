import { body } from "express-validator"; 
import { param } from "express-validator"; 

//post/task 
export const validarCrearTarea = [
    body("title").notEmpty().withMessage("No debe estar vacio ").isString().withMessage("Debe ser de tipo strign"),
    body("description").notEmpty().withMessage("No debe estar vacio ").isString().withMessage("Debe ser de tipo strign")
]

//put/task/:id 
export const validarActualizarTarea = [
    param("id").isInt().withMessage("Debe ser un numero"),
    body("title").notEmpty().withMessage("No debe estar vacio ").isString().withMessage("Debe ser de tipo strign"),
    body("description").notEmpty().withMessage("No debe estar vacio ").isString().withMessage("Debe ser de tipo strign")    
]

//get/lista de tarea
export const validarListaTarea = [
    param("id").isInt().withMessage("Debe ser un numero"),
]

//delete/task/:id
export const validarEliminarTarea = [
    param("id").isInt().withMessage("Debe ser un numero"),
]
