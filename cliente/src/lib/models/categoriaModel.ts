export class Categoria {

    private _id: number;
    private _genero: string;
    private _año: number;

    constructor(id: number, genero: string, año: number) {
        this._id = id;
        this._genero = genero;
        this._año = año;
    }

    // Getters
    public get getId(): number {
        return this._id;
    }
    public get getGenero(): string {
        return this._genero;
    }
    public get getAño(): number {
        return this._año;
    }

    // Setters
    public set setId(id: number) {
        this._id = id;
    }
    public set setGenero(genero: string) {
        this._genero = genero;
    }
    public set setAño(año: number) {
        this._año = año;
    }

}