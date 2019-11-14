import { Request, Response, NextFunction }  from "express"
import {Types} from "mongoose"
import jwt from "jsonwebtoken"
import axios from "axios"
import {variables} from "./../../config/settings"


const Params = (req:Request, res:Response, next: NextFunction) => {
  const ObjectId = Types.ObjectId
  const params = req.params.id
  if(ObjectId.isValid(params)){
    next()
  }
  else{
    res.status(500).send({code: 500, error: true, data: params, message:"Id invalido"})
  }
}

const jwValidate =(req:Request, res:Response, next: NextFunction) => {
  const {token} = req.query
  if(token){
    jwt.verify(token, "seguridadMaxima", (err : any ,decoded: any)=>{
      console.log("error: ", err)
      console.log("decodes:", decoded);
      if(decoded && decoded.user){
        const {email, password} = decoded.user
        const url = `${variables.usermsurl}${email}/login`
        console.log(url,"esta es mi url")
       // axios.post(url,{password})
       //   .then((data:any) => {
       //     if(data && data.data){
       //       console.log("yei")
       //       next()
       //     }else res.status(401).json({"mensaje": "ACCESO DENEGADO"})
       //   })
       //   .catch((err:any) => res.status(401).json({"mensaje": "ACCESO DENEGADO"}))
       next()
        }
    })
  
  }else res.status(401).json({"mensaje":"ACCES DENIED"})
  console.log(req.query)
}



//const datos = (req:Request, res:Response, next:NextFunction) => { 
  //  const matches = req.body.name.match(/d+/g)
   // if()
//}
export {
  Params,
  jwValidate
}