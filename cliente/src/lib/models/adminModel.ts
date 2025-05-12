import { Entrenador } from "./entrenadorModel";

export class Admin extends Entrenador {

    private _telefono: string;
    private _email: string;

    constructor(dni: string, nombre: string, apellido: string, telefono: string, email: string) {
        super(dni, nombre, apellido);
        this._telefono = telefono;
        this._email = email;
    }


    public armarEquipo(): void {
        
    }
    
    public cargarPartido(): void {

    }

    public crearEntrenamiento(): void {

    }

    public crearNotificacion(): void {

    }

}