const express= require('express'); 
const bd = require('bd');

const app = express();


app.use(express.text()); 
app.use(express.json());

//crear una nueva tarea 
app.post("/tasks:", ( req, res) => {
let {title, description, isComplete} = req.body; 
//validacion de los tipos de datos ingresados 

if (!title ||!description ) {
    return res.status(400).json({ error: "Todos los campos son obliggatorios" });
}

if (typeof title!=='string' || typeof description!=='string' || typeof isComplete!== 'boolean') {
    return res.status(400).json({ error: "Los datos ingresados deben no son correcto" });
}

const titleExist = bd.find((title) => title.title === title);

if (titleExist) {
    return res.status(400).json({ error: "Esta tarea ya existe" });
}

bd.push({title: title, description:description, isComplete: isComplete });


})