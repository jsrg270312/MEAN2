import mongoose, {Schema, Document}  from "mongoose"
import uniqueValidator from "mongoose-unique-validator"
//import bcrypt from "bcrypt"

import { Mascota as IMascota } from "./../interfaces"

const mascotaSchema: Schema = new Schema({
    nombre: {
        type : String,
        reqired: [true, "nombre requerido"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    descripcion:{
        type : String,
        reqired: [true, "descripcion requerido"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    foto :{
        type : String,
        reqired: [true, "descripcion requerido"],
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    precio:{
        type : Number,
        reqired: [true, "descripcion requerido"],
        unique: false,
        lowercase: true,
        trim: true,
        index: true
    },
    mascotaType:{
        type: String,
        enum: ["terrestre", "marino","volador"],
        reqired: true,
        default: "terrestre"
    }
}) 
mascotaSchema.plugin(uniqueValidator, {message: "ya existe!"})

export default mongoose.model <IMascota>("Mascota",mascotaSchema )