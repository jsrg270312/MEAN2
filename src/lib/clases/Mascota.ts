import { Mascota as IMascota } from "./../../interfaces/"
import mongoose , {Types} from "mongoose"
import {Mascotas as MMascota} from "./../../models/"
import { deleteMascota } from "../controller";

interface iMascotaInput{
  nombre: IMascota["nombre"]
  descripcion : IMascota["descripcion"]
  foto : IMascota["foto"]
}

export default class Mascota { 

    private nombre: IMascota["nombre"]
    private descripcion: IMascota["descripcion"]
    private foto: IMascota["foto"]
    private body : IMascota


    constructor (body: IMascota) {
        const {nombre, descripcion, foto} = body
        this.nombre = nombre
        this.descripcion = descripcion
        this.foto = foto
        this.body = body
    }

    Save(data: iMascotaInput): Promise <IMascota | Error[]> {
      const mascota = new MMascota(data)
      return new Promise((resolve, reject) => {
        mascota.save((err, u: IMascota) => (err) ? reject(err) : resolve(u))
      })
    }

    getMascota (id?: Types.ObjectId) {
      const criteria = (id) ? {_id: id}: {}
      return MMascota.find(criteria)
      .then(u => (id && u.length < 1) ? {} : (id && u[0]._id) ? u[0] : u)
      .catch((e => e))
    }

    postMascota (): Promise <IMascota | Error[]>{
      const data: iMascotaInput = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        foto: this.foto
      }
      return new Promise((resolve, reject) => {
        this.Save(data)
          .then((mascota) => resolve(mascota))
          .catch((error: Error[]) => reject(error))
      })
    }

    updateMascota(id: Types.ObjectId): Promise <IMascota | Error[]> {
      return new Promise((resolve, reject) => {
        this.getMascota(id)
          .then((mascota: any) => {
            mascota.nombre = this.nombre || mascota.nombre
            mascota.descripcion = this.descripcion || mascota.descripcion
            mascota.foto = this.foto || mascota.foto
            this.Save(mascota)
            .then((newMascota:any) => (newMascota && newMascota._id)? resolve(newMascota): reject({}))
            .catch(e => reject(e))
          })
      })
    }

    deleteMascota(id: Types.ObjectId){
      const criteria = (id) ? {_id: id}: {}
      return MMascota.remove(criteria)
      .then(mascota => mascota)
      .catch(e => e)
    }
}