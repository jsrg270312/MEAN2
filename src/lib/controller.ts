import { Request, Response }  from "express"
import { Mascota, Response as R} from "./clases/"
import { Mascota as IMascota } from "./../interfaces"
import { Types } from "mongoose"


const getMascota = (req:Request, res:Response): void =>  {
    const mascota = new Mascota(req.body)
    mascota.getMascota(Types.ObjectId(req.params.id))
    .then((u) => {
        const response = new R(u, req.method)
        res.status(response.getStatusCode()).json(response.data())
    })
    .catch((e: any) => {
        console.log("catch")
        const response = new R(null, req.method, e.errors)
        res.status(500).json(response.data())
    })
}
const listMascota = (req:Request, res:Response): void =>  { 
    const mascota = new Mascota(req.body)
    mascota.getMascota()
    .then((u) => {
        const response = new R(u, req.method)
        res.status(response.getStatusCode()).json(response.data())
    })
    .catch((e: any) => {
        console.log("catch")
        const response = new R(null, req.method, e.errors)
        res.status(500).json(response.data())
    })
}
const postMascota = (req:Request, res:Response): void =>  { 
    const mascota = new Mascota(req.body)

    mascota.postMascota()
        .then((u: any) => {
            if(u && u._id){
                
                const response = new R (u, req.method)
                res.status(response.getStatusCode()).json(response.data())
            }
        })
        .catch((e: any) => {
            console.log("catch")
            const response = new R(null, req.method, e)
            res.status(response.getStatusCode()).json(response.data())
        })
}
const updateMascota = (req:Request, res:Response): void =>  { 
    const usuario = new Mascota(req.body)
    usuario.updateMascota(Types.ObjectId(req.params.id))
    .then((u: any) => {
        if(u && u._id){
            const response = new R (u, req.method)
            res.status(response.getStatusCode()).json(response.data())
        }
    })
    .catch((e: any) => {
        console.log("catch")
        const response = new R(null, req.method, e)
        res.status(response.getStatusCode()).json(response.data())
    })
}
const deleteMascota = (req:Request, res:Response): void =>  { 
    const usuario = new Mascota(req.body)
    usuario.deleteMascota(Types.ObjectId(req.params.id))
    .then(u =>  {console.log(u),res.status(200).json({"message":"Mascota eliminada"})})
    .catch((e: any ) => res.status(200).json({code:500,"message":e.errors}))
}

export {
    getMascota,
    listMascota,
    updateMascota,
    deleteMascota,
    postMascota 
}