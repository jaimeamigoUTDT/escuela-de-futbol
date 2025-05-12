
export class Partido {
    private _id: number;
    private _fecha: Date;
    private _hora: string;
    private _rival: string;
    private _id_categoría: number;
    private _id_cancha: number;

    constructor (id: number, fecha: Date, hora: string, rival: string, id_categoria: number, id_cancha: number) {
        this._id = id;
        this._fecha = fecha;
        this._hora = hora;
        this._rival = rival;
        this._id_categoría = id_categoria;
        this._id_cancha = id_cancha;
    }

    // Getters
    public get getId(): number {
        return this._id;
    }
    public get getFecha(): Date {
        return this._fecha;
    }
    public get getHora(): string {
        return this._hora;
    }
    public get getRival(): string {
        return this._rival;
    }
    public get getIdCategoria(): number {
        return this._id_categoría;
    }
    public get getIdCancha(): number {
        return this._id_cancha;
    }
    
    // Setters
    public set setId(id: number) {
        this._id = id;
    }
    public set setFecha(fecha: Date) {
        this._fecha = fecha;
    }
    public set setHora(hora: string) {
        this._hora = hora;
    }
    public set setRival(rival: string) {
        this._rival = rival;
    }
    public set setIdCategoria(id_categoria: number) {
        this._id_categoría = id_categoria;
    }
    public set setIdCancha(id_cancha: number) {
        this._id_cancha = id_cancha;
    }

    // Métodos

    public guardarPartido(): void {} // -> Se comunica con el backend para guardar el partido
}