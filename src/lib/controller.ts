import { Request, Response }  from "express"
import { Mascota, Response as R} from "./clases/"
import { Mascota as IMascota } from "./../interfaces"

const getMascota = (req:Request, res:Response): void =>  {
    const mascota = new Mascota(req.body)
    const data = mascota.getMascota(Number(req.params.id))
    //const code = (data) ? 200 : 404 
    const response = new R(data, req.method)
    //console.log(response.getSatusCode())
    //res.status(200).json(data || {})
    console.log(response.data())
    res.status(response.getStatusCode()).json(response.data())
}
const listMascota = (req:Request, res:Response): void =>  { 
    console.log("listMascota")
    const mascotas = new Mascota(req.body).ListMascotas()
    console.log(mascotas)
    const response = new R (mascotas, req.method)

    console.log(typeof mascotas)
    res.status(response.getStatusCode()).json(response.data())
}
const postMascota = (req:Request, res:Response): void =>  { 
    console.log("postMascota")
    const mascota = new Mascota(req.body).postMascota()
    const response = new R(mascota, req.method)
    console.log(response)
    res.status(response.getStatusCode()).json(response.data())
}
const updateMascota = (req:Request, res:Response): void =>  { 
    console.log("updateMascota")
    const mascota = new Mascota(req.body).updateMascota(Number(req.params.id))
    const response = new R (mascota, req.method)
    res.status(response.getStatusCode()).json(response.data())

}
const deleteMascota = (req:Request, res:Response): void =>  { 
    console.log("deleteMascota")
    const mascota = new Mascota(req.body).deleteMascota(Number(req.params.id))
    console.log(mascota)
    const response = new R (mascota, req.method)
    res.status(response.getStatusCode()).json(response.data())

}

export {
    getMascota,
    listMascota,
    updateMascota,
    deleteMascota,
    postMascota 
}