import { Mascota as IMascota } from "./../../interfaces/"
import { deleteMascota } from "../controller";
export default class Mascota { 

    private nombre: IMascota["nombre"]
    private descripcion: IMascota["descripcion"]
    private foto: IMascota["foto"]

    private mascotas: IMascota[] = [
        {
          id:1,
          nombre:"El gato Caminante",
          descripcion: "El único gato que cammina en dos  patas   UuUr",
          foto: "/assets/img/gato.gif"
        },
        {
          id:2,
          nombre:"El perro ",
          descripcion: "El perro caminante",
          foto: "/assets/img/perro.jpg"
        },
        {
          id: 3,
          nombre:"El pajaro",
          descripcion: "El pajaro volador",
          foto: "/assets/img/pajaro.gif"
        }
      ];

    constructor (body: IMascota) {
        const {nombre, descripcion, foto} = body
        this.nombre = nombre
        this.descripcion = descripcion
        this.foto = foto
    }

    ListMascotas (): IMascota[] {
        return this.mascotas
    }
    getMascota (id: IMascota["id"]): IMascota {
        return this.mascotas.filter((mascota: IMascota) => id === mascota.id)[0]
    }
    postMascota ()  {
        const nuevaMascota = {
          id: this.mascotas.length + 1,
          nombre: this.nombre,
          descripcion: this.descripcion,
          foto: this.foto
        }
        this.mascotas.push(nuevaMascota)
        return nuevaMascota

    }
    updateMascota(id: IMascota["id"]){
      const mascota = this.getMascota(id)
      if(!mascota) return null
      else{
        mascota.nombre = this.nombre || mascota.nombre
        mascota.descripcion = this.descripcion || mascota.descripcion
        mascota.foto = this.foto || mascota.foto
        console.log(this.mascotas)
        return mascota
      }
    }

    deleteMascota(id: IMascota["id"]){
      const total = this.mascotas.length
      this.mascotas = this.mascotas.filter(mascota => mascota["id"] !== id )
      return (total > this.mascotas.length) ? true : false
    }
}