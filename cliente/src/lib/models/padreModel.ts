import { Persona } from "./personaModel";
import { Jugador } from "./jugadorModel";

export class Padre extends Persona {
    private _telefono : string;
    private _email : string;

    constructor(dni: number, nombre: string, apellido: string, telefono: string, email: string) {
        super(dni, nombre, apellido);
        this._telefono = telefono;
        this._email = email;
    }

    // Getters
    public get getTelefono(): string {
        return this._telefono;
    }
    public get getEmail(): string {
        return this._email;
    }

    // Setters
    public set setTelefono(telefono: string) {
        this._telefono = telefono;
    }
    public set setEmail(email: string) {
        this._email = email;
    }

    // Métodos

    public crearJugador(dni: number, nombre: string, apellido: string, fecha_de_nacimiento: Date, genero: string): Jugador {
        
        const jugador_hijo = new Jugador(
            dni, 
            nombre, 
            apellido, 
            fecha_de_nacimiento, 
            genero,
            this.getDni);

        return jugador_hijo;

    }

    public notificarAusencia(): void {}

}