import { connectDb} from "../../bd.js"

//crear una nueva tarea 
export const crearTarea = async (req, res) => {

    let {title, description} = req.body; 
    //validacion de los tipos de datos ingresados 
    const titleExist = bd.find((title) => title.title === title);
    
    if (titleExist) {
        return res.status(400).json({ error: "Esta tarea ya existe" });
    }
    const newTasks = {title: title, description:description}
    bd.push(newTasks);
    res.status(201).json(newTasks)
    
    }
    
    
//obtener todas las tareas 
export const todasTareas = async (req, res) => {
    res.json(bd);
}
    
    //obtener una tarea por su id
export const tareaId = (req, res) => {
    const {id} = req.params;
    const tasks = bd.find((tasks) => tasks.id === parseInt(id)); 
    if (!tasks) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    } 
    res.status(200).json(tasks)
}
    
    
    //actualizar una tarea por su id
export const actualizarId = async (req, res) => {
    const {id} = req.params; 
    const tasks = bd.find((tasks) => tasks.id === parseInt(id));
    //control de si no existe ese id ingresado 
    if (!tasks) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    let {title, description} = req.body; 

    if (!title ||!description ) {
        return res.status(400).json({ error: "Todos los campos son obliggatorios" });
    }
    if (typeof title!=='string' || typeof description!=='string') {
        return res.status(400).json({ error: "Los datos ingresados deben no ser correcto" });
    }
    tasks.title = title;
    tasks.description = description;   
    
    res.status(200).json(tasks)

}
    
export const eliminarTarea = (req,res) => {
    const {id} = req.params;
    const task = bd.find((task) => task.id === parseInt(id));
    //control de si no existe ese id ingresado 
    if (!task) {
        return res.status(404).json({ error: "Tarea no encontrada" });
    }

    const taskIndex = bd.indexOf((task) => task.id === parseInt(id));
    bd.splice(index, 1);
    res.send('tarea eliminada con existo');
    

}