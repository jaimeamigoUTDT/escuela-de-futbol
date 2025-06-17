import React, { createContext, useState, useContext } from 'react';

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    const getStoredCategories = () => {
        return categories;
    };

    const saveCategory = (category) => {

        // Check if the category already exists
        const existingCategory = categories.find((c) => c.id === category.id);

        if (!existingCategory) {
            setCategories((prevCategories) => [...prevCategories, category]);
        }

        categories.sort((a, b) => {
            // Combine date and time into a single Date object for comparison
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            
            // Handle invalid dates
            if (isNaN(dateTimeA)) return 1; // Push invalid dates to the end
            if (isNaN(dateTimeB)) return -1;
            
            return dateTimeB - dateTimeA; // Sort ascending (earliest first)
        });

    };

    return (
        <CategoriesContext.Provider value={{ categories, saveCategory, getStoredCategories }}>
            {children}
        </CategoriesContext.Provider>
    );
};

export const useCategories = () => useContext(CategoriesContext);