export class Persona {
    private _dni: string;
    private _nombre: string;
    private _apellido: string;
  
    constructor(dni: string, nombre: string, apellido: string) {
      this._dni = dni;
      this._nombre = nombre;
      this._apellido = apellido;
    }
  
    // Getters
    public get getDni(): string {
      return this._dni;
    }
  
    public get getNombre(): string {
      return this._nombre;
    }
  
    public get getApellido(): string {
      return this._apellido;
    }
  
    // Setters
    public set setDni(dni: string) {
      this._dni = dni;
    }
  
    public set setNombre(nombre: string) {
      this._nombre = nombre;
    }
  
    public set setApellido(apellido: string) {
      this._apellido = apellido;
    }
  }