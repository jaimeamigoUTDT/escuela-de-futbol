export class Persona {
    private _dni: number;
    private _nombre: string;
    private _apellido: string;
  
    constructor(dni: number, nombre: string, apellido: string) {
      this._dni = dni;
      this._nombre = nombre;
      this._apellido = apellido;
    }
  
    // Getters
    public get getDni(): number {
      return this._dni;
    }
  
    public get getNombre(): string {
      return this._nombre;
    }
  
    public get getApellido(): string {
      return this._apellido;
    }
  
    // Setters
    public set setDni(dni: number) {
      this._dni = dni;
    }
  
    public set setNombre(nombre: string) {
      this._nombre = nombre;
    }
  
    public set setApellido(apellido: string) {
      this._apellido = apellido;
    }
  }