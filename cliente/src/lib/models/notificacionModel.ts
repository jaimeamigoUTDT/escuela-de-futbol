export class Notificacion {
    
    private _id_notificacion: number;
    private _id_partido: number;
    private _contenido: string;

    constructor(id_notificacion: number, id_partido: number, contenido: string) {
        this._id_notificacion = id_notificacion;
        this._id_partido = id_partido;
        this._contenido = contenido;
    }

    // Getters
    public get getIdNotif(): number {
        return this._id_notificacion;
    }
    public get getIdPartido(): number {
        return this._id_partido;
    }
    public get getContenido(): string {
        return this._contenido;
    }

    // Setters
    public set setIdNotif(value: number) {
        this._id_notificacion = value;
    }
    public set setIdPartido(value: number) {
        this._id_partido = value;
    }
    public set setContenido(value: string) {
        this._contenido = value;
    }
} 