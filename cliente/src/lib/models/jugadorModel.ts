import { Persona } from "./personaModel";

export class Jugador extends Persona {
    private _fecha_de_nacimiento: Date;
    private _genero: string;
    private _dni_padre: number;

    constructor(dni: number, nombre: string, apellido: string, fecha_de_nacimiento: Date, genero: string, dni_padre: number) {
        super(dni, nombre, apellido);
        this._fecha_de_nacimiento = fecha_de_nacimiento;
        this._genero = genero;
        this._dni_padre = dni_padre;
    }

    // Getters
    public get getFechaDeNacimiento(): Date {
        return this._fecha_de_nacimiento;
    }
    public get getGenero(): string {
        return this._genero;
    }
    public get getDniPadre(): number {
        return this._dni_padre;
    }

    // Setters
    public set setFechaDeNacimiento(fecha_de_nacimiento: Date) {
        this._fecha_de_nacimiento = fecha_de_nacimiento;
    }
    public set setGenero(genero: string) {
        this._genero = genero;
    }
    public set setDniPadre(dni_padre: number) {
        this._dni_padre = dni_padre;
    }

    // Método

    public guardarJugador(): void {}
}