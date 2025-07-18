import Categories from "../Models/Categories.js";

const CategoriesController = {
    // Create a new Category
    async CreateCategorie(req, res) {
    try {
        const newCategory = new Categories({
            CategorieName: req.body.CategorieName,
            CategoriePoster: req.file.path, 
            CategorieDiscriptions: req.body.CategorieDiscriptions
        });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: "Failed to create Category", error: err.message });
    }
},
    // Get all categories
    async GetCategorie(req, res) {
        try {
            const categories = await Categories.find()
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ message: "Failed to retrieve categories", error: err.message });
        }
    },

    // Get a category by ID
    async GetCategorieById(req, res) {
        try {
            const category = await Categories.findById(req.params.id)
            if (!category) {
                return res.status(404).json({ message: "Category not found" });
            }
            res.status(200).json(category);
        } catch (err) {
            res.status(500).json({ message: "Error retrieving category", error: err.message });
        }
    },

    // Update category by ID
    async UpdateCategorieById(req, res) {
  try {
    const existingCategory = await Categories.findById(req.params.id);
    const updatedFields = {
      CategorieName: req.body.CategorieName,
      CategorieDiscriptions: req.body.CategorieDiscriptions,
      CategoriePoster: req.file ? req.file.path : existingCategory.CategoriePoster
    };
    const updatedCategory = await Categories.findByIdAndUpdate(
      req.params.id,
        updatedFields,
    );

    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json({ message: "Failed to update category", error: err.message });
  }
},

    // Delete category by ID
    async DeleteCategorieById(req, res) {
        try {
            const deletedCategory = await Categories.findByIdAndDelete(req.params.id);

            if (!deletedCategory) {
                return res.status(404).json({ message: "Category not found" });
            }

            res.status(200).json({ message: "Deleted successfully" });
        } catch (err) {
            res.status(500).json({ message: "Failed to delete category", error: err.message });
        }
    }
};

export default CategoriesController;
