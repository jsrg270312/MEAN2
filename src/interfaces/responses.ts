import {Mascota} from "./"

interface MascotaResponse{
    code: number;
    error: boolean;
    data: Mascota | Mascota[] | {} | null;
    messages: Error[]
}

interface Error {
    message: string;
    name: string;
    properties: {
        message: string;
        type: string;
        path: string; 
        value: string;
    }
    kind: string;
    path: string;
    value: string;
}

export{
    MascotaResponse,
    Error
}