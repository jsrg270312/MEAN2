import express from "express";
import bodyParser from "body-parser";
import http from "http";
import io from "socket.io";


import Routes from "./lib/routes"

import { Server as Main } from "./interfaces/"
const app = express(),
    server = new http.Server(app),
    host = "localhost"

const main : Main = {
    port: process.env.PORT || 9000,
    app, server, host,
    socket: io(server)
}
//{ }
class Server { 

    constructor(private main: Main){}

    appConfig() { 
        this.main.app  
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({ extended: true }))
    }
    
    includeRoutes() { 
        new Routes(this.main.app, this.main.socket).routesConfig()
    }

    initDB() { 

    }

    appExecute() { 
    this.appConfig()
    this.includeRoutes()
    this.initDB()
    const onListening = () => console.log(`conexion establecida por el ´puerto ${ this.main.port}`)
    this.main.server.listen(this.main.port, onListening)
    }

}
const start = new Server(main)

start.appExecute()
    