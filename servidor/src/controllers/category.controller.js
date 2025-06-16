const categoryService = require('../services/category.service');
const { Category } = require('../models/category.model');

function createCategory(req, res) {

    try {
    
        const newCategoryData = req.body;

        if (!newCategoryData.category_id){
            return res.status(400).send({ message: 'category_id is missing' });
        } else if (!newCategoryData.year){
            return res.status(400).send({ message: 'Year is missing' });
        } else if (!newCategoryData.gender){
            return res.status(400).send({ message: 'Gender is missing' });
        }

        const categoryData = categoryService.createCategory(newCategoryData);

        res.status(201).send({ message: 'Category created', data: categoryData });

    } catch(e){
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
    
}

function getCategories(req, res) {
    try {
        
        queryParameters = req.query;
    
        const data = categoryService.getCategories(queryParameters)
    
        res.status(200).send({ message: 'List of categories', data: data});
    
      } catch (error) {
        console.log(error); // Pass errors to error middleware
        res.status(500).send({ message: 'Internal Server Error', data: {} });
      }
}

function updateCategory(req, res) {
    try {
        const updateCategoryData = req.body;

        if (!updateCategoryData.category_id){
            return res.status(400).send({ message: 'category_id is missing' });
        } else if (!updateCategoryData.year){
            return res.status(400).send({ message: 'Year is missing' });
        } else if (!updateCategoryData.gender){
            return res.status(400).send({ message: 'Gender is missing' });
        }

        const updateCategory = categoryService.updateCategory(updateCategoryData);

        if (!updateCategory) {
            return res.status(400).send({ message: 'Category not found' });
        }

        res.status(201).send({ message: 'Category updated', data: updateMatch });


    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

function deleteCategory(req, res) {
    
    try {
        const category_id = req.body.category_id;

        if (!category_id) {
            return res.status(400).send({ message: 'category_id is missing' });
        }

        const deletedCategory = categoryService.deleteCategory(category_id);

        if (!deletedCategory) {
            return res.status(400).send({ message: 'Category not found' });
        }

        res.status(201).send({ message: 'Category deleted' });

    } catch (e) {
        res.status(500).send({ message: `Error ${e} `, data: {}});
    }
}

module.exports = {createCategory, getCategories, updateCategory, deleteCategory};