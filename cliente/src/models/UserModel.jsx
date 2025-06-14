const UserModel = {
    id: null,
    name: '',
    dni: '',
    email: '',
    password: '',

    // Method to initialize a user
    initialize(data) {
        this.id = data.id || null;
        this.name = data.name || '';
        this.dni = data.dni || '';
        this.email = data.email || '';
        this.password = data.password || '';
    },

    // Method to validate user data
    validate() {
        if (!this.name) throw new Error('Name is required');
        if (!this.email) throw new Error('Email is required');
        if (!this.dni) throw new Error('Dni is required');
        if (!this.password) throw new Error('Password is required');
    },

    // Method to update user data
    update(data) {
        this.name = data.name || this.name;
        this.email = data.email || this.email;
        this.dni = data.dni || this.dni;
        this.password = data.password || this.password;
    },
};

export default UserModel;