import { Server as Main } from "./../interfaces/"
import { Request, Response }  from "express"
import{ getMascota,
deleteMascota,
updateMascota,
postMascota,
listMascota
} from "./controller"

export default class Routes { 
    constructor(private app: Main["app"], private socket: Main["socket"]){ }
    appRoutes () { 
        this.app.get("/", (req:Request, res:Response) => res.status(200).send("yei") )

        this.app.get("/v1/mascota/:id", getMascota)
        this.app.get("/v1/mascota/", listMascota)
        this.app.post("/v1/mascota/", postMascota)
        this.app.put("/v1/mascota/:id", updateMascota)
        this.app.delete("/v1/mascota/:id", deleteMascota)
    }

     routesConfig() {
         this.appRoutes()
     }
}