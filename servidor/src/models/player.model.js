
class Player {
  
  constructor({ dni, name, surname, date_of_birth, gender, parent_dni, category_id}) {
    this.dni = dni;
    this.name = name;
    this.surname = surname;
    this.date_of_birth = date_of_birth;
    this.gender = gender;
    this.parent_dni = parent_dni;    
    this.category_id = category_id;
  }
}

module.exports = { Player };