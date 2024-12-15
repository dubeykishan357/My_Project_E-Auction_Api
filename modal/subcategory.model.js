import mongoose from 'mongoose';

const SubCategorySchema = mongoose.Schema({
  _id: Number,
  catnm: {
    type: String,
    required: [true,"Category name is required"],
    lowercase: true,
    trim: true,
  },
  subcatnm: {
    type: String,
    required: [true,"SubCategory name is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  subcaticonnm: {
    type: String,
    required: [true,"SubCategory icon name required"],
    trim: true
  }
});



const SubCategorySchemaModel = mongoose.model('Subcategory_collection',SubCategorySchema);

export default SubCategorySchemaModel;

