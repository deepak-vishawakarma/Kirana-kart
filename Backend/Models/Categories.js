import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema({
  CategorieName: {
    type: String,
    required: true,
    trim: true,
  },
  CategoriePoster: {
    type: String,
    required: true,
    trim: true,
  },
  CategorieDiscriptions: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model("Categories", CategoriesSchema);
