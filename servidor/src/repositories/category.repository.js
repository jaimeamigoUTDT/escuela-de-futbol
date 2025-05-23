const { Category } = require('../models/category.model.js');

class categoryRepository {

    categories = [
        new Category(1, '2023', 'Masculino'),
        new Category(2, '2023', 'Femenino'),
        new Category(3, '2024', 'Masculino'),
        new Category(4, '2024', 'Femenino'),
        new Category(5, '2023', 'Masculino'),
        new Category(6, '2023', 'Femenino'),   
    ]
}

module.exports = new categoryRepository();