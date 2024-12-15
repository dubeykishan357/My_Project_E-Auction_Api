import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
  _id: Number,
  catnm: {
    type: String,
    required: [true,"Category name is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  caticonnm: {
    type: String,
    required: [true,"Category icon name required"],
    trim: true
  }
});



const CategorySchemaModel = mongoose.model('category_collection',CategorySchema);

export default CategorySchemaModel;

