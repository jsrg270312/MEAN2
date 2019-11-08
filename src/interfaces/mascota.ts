import mongoose, {Schema, Document}  from "mongoose"

interface Mascota extends Document { 
    id?: number;
    nombre: string;
    descripcion: string;
    foto: string;
}

export{
    Mascota
}