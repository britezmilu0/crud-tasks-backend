import { connectDb} from "../../../bd.js"




//crear una nueva tarea 
export const crearTarea = async (req, res) => {
    
    const connection = await connectDb();
    
    const {title, description,isComplete} = req.body; 

    await connection.query('INSERT INTO `tasks`(`title`, `description`, `isComplete`) VALUES (?, ?, ?)', [title, description, isComplete])

    res.status(200).json({
        msg: "se creo una nueva tarea"
    })
}  
    
//obtener todas las tareas 
export const todasTareas = async (req, res) => {
    //conexcion con la base de datos 
    const connection = await connectDb(); 
    //consultas Sql para obtener todas las tareas
    const [result] = await  connection.query('SELECT * FROM `tasks`')
    //verificar si no hay tareas
    if (result.length === 0)  {  //si la consulta no devuelve nada, quiere decir que no hay tareas 
        
        //cerrar la conexion con la base de datos
        await connection.end(); 
        
        //devolver mensaje de que no hay tareas
        return res.status(200).json({
            msg:"Aún no existen tareas"
        })
    }else { //retornar las tareas que existen en la base de datos en formato json
            res.status(200).json(result);
    }   
}

    //obtener una tarea por su id
export const tareaId = async (req, res) => {
    const connection = await connectDb()

    const {id} = req.params;

    const [result] = await connection.query('SELECT * FROM tasks WHERE id=?', id);
    //control de si la tarea existe y mostrarla tarea
    if (result.length === 0) {
        //cerrar la conexion con la base de datos
        await connection.end(); 
        
        //devolver mensaje de que la tarea no existe
        return res.status(404).json({
            msg:"Tarea no encontrada"
        })
    } else {
        res.status(200).json(result);
    }
    
}
    
    
    //actualizar una tarea por su id
export const actualizarId = async (req, res) => {
    const connection = await connectDb();

    const id = parseInt(req.params.id); 

    const {title, description, isComplete} = req.body; 

    //controlar si la tarea esta en la base de datos
    const [result] = await connection.query('SELECT * FROM tasks WHERE id=?', id);
    if (result.length === 0) {
        
        //devolver mensaje de que la tarea no existe
        return res.status(404).json({
            msg:"Tarea no encontrada"
        })
    // actualizar si la tarea existe 
    }else {
        await connection.query('UPDATE tasks SET title= ?,description= ?, isComplete= ? WHERE id = ?', [title, description, isComplete, id])
        //devolver mensaje de que la tarea se actualizo correctamente
        return res.status(200).json({
            msg:"Tarea actualizada correctamente"
        })
    }

}

    //borrar una tarea por su id
    export const eliminarTarea = async (req, res) => {
        const connection = await connectDb();
        const id = parseInt(req.params.id);
        
        //controlar si la tarea esta en la base de datos
        const [result] = await connection.query('SELECT * FROM tasks WHERE id=?', id);
        if (result <= 0 ) {
            //devolver mensaje de que la tarea no existe
            return res.status(404).json({
                msg:"Tarea no existe"
            })
        }else {
            //borrar si la tarea existe
            await connection.query('DELETE FROM tasks WHERE id =?', id);
            //devolver mensaje de que la tarea se elimino correctamente
            return res.status(200).json({
                msg:"Tarea eliminada correctamente"
            })
        }

    }