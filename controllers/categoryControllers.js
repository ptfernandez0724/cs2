const Category = require('../models/category');


// add category
module.exports.addCategory = async (req) => {

    let newCategory = new Category({
        name: req.body.name,
        description: req.body.description
    });

    return await newCategory.save()
    .then(newCategory => { 
        return (newCategory) 
            ? "Category is added" 
            : "Failed" 
        })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}

// update category
module.exports.updateCategory = (req) => {
    return Category.findByIdAndUpdate({ _id: req.params.categoryId }, 
        {   name: req.body.name            
        })
    .then(updatedCategory => { 
        return (updatedCategory) 
            ? "Category update was successful"
            : "Category update failed" 
        })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}

// archive category
module.exports.archiveCategory = (req) => {
    return Category.findByIdAndUpdate({ _id: req.params.categoryId }, 
        {   isAvailable: false
        })
    .then(archivedCategory => { 
        return (archivedCategory) 
            ? "Category archive was successful" 
            : "Category archive failed" 
        })
    .catch(error => res.status(500).send({message: "Internal Server Error"}))
}