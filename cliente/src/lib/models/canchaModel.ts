export class Cancha {
    private _id: number;
    private _direccion: string;
    private _tamaño: number;
    private _tipoBotines: string;
    private _buffetDisponible: boolean;
    private _estacionamientoDisponible: boolean;

    constructor(
        id: number,
        direccion: string,
        tamaño: number,
        tipoBotines: string,
        buffetDisponible: boolean,
        estacionamientoDisponible: boolean
    ) {
        this._id = id;
        this._direccion = direccion;
        this._tamaño = tamaño;
        this._tipoBotines = tipoBotines;
        this._buffetDisponible = buffetDisponible;
        this._estacionamientoDisponible = estacionamientoDisponible;
    }

    // Getters
    public get getId(): number {
        return this._id;
    }
    public get getDireccion(): string {
        return this._direccion;
    }
    public get getTamaño(): number {
        return this._tamaño;
    }
    public get getTipoBotines(): string {
        return this._tipoBotines;
    }
    public get getBuffetDisponible(): boolean {
        return this._buffetDisponible;
    }
    public get getEstacionamientoDisponible(): boolean {
        return this._estacionamientoDisponible;
    }

    // Setters
    public set setId(value: number) {
        this._id = value;
    }

    public set setDireccion(value: string) {
        this._direccion = value;
    }
    public set setTamaño(value: number) {
        this._tamaño = value;
    }
    public set setTipoBotines(value: string) {
        this._tipoBotines = value;
    }
    public set setBuffetDisponible(value: boolean) {
        this._buffetDisponible = value;
    }
    public set setEstacionamientoDisponible(value: boolean) {
        this._estacionamientoDisponible = value;
    }

}