import { Jugador } from './jugadorModel';


export class Equipo {
    private _id: number;
    private _id_partido: number;
    private _id_categoria: number;
    private _jugadores_citados: Jugador[];

    public constructor(id: number, id_partido: number, id_categoria: number, jugadores_citados: Jugador[]) {
        this._id = id;
        this._id_partido = id_partido;
        this._id_categoria = id_categoria;
        this._jugadores_citados = jugadores_citados;
    }

    // Getters
    public get getId(): number {
        return this._id;
    }
    public get getIdPartido(): number {
        return this._id_partido;
    }
    public get getIdCategoria(): number {
        return this._id_categoria;
    }
    public get getJugadoresCitados(): Jugador[] {
        return this._jugadores_citados;
    }

    // Setters
    public set setId(id: number) {
        this._id = id;
    }
    public set setIdPartido(id_partido: number) {
        this._id_partido = id_partido;
    }
    public set setIdCategoria(id_categoria: number) {
        this._id_categoria = id_categoria;
    }
    public set setJugadoresCitados(jugadores_citados: Jugador[]) {
        this._jugadores_citados = jugadores_citados;
    }

    // Métodos

    public guardarEquipo(): void {}

}