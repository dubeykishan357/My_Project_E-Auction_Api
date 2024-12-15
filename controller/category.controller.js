import "../modal/conection.js";
import CategorySchemaModel from "../modal/category.model.js";
import url from "url";
import path from "path";
import rs from "randomstring";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export var save = async (req, res) => {
  var cList = await CategorySchemaModel.find();
  // console.log(cList);
  var l = cList.length;
  var _id = l == 0 ? 1 : cList[l - 1]._id + 1;

  var caticon = req.files.caticon;
  var caticonnm = Date.now()+"-"+rs.generate(15)+"-"+ caticon.name;
  var uploadpath = path.join(
    __dirname,
    "../../UI/public/assets/upload/caticon",
    caticonnm
  );
  

  var cDetails = { ...req.body, caticonnm: caticonnm, _id: _id };
  try {
    await CategorySchemaModel.create(cDetails);
    caticon.mv(uploadpath);
    res.status(201).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export var fetch = async (req, res) => {
  var condition_obj = req.query;
  var cDetails = await CategorySchemaModel.find(condition_obj);
  if (cDetails.length > 0) res.status(200).json(cDetails);
  else res.status(404).json({ response: "Requested resource not found...." });
};

// export var deleteCategory = async (req, res) => {
//   var condition_obj = JSON.parse(req.body.condition_obj);
//   var cDetails = await CategorySchemaModel.find(condition_obj);
//   if (cDetails.length > 0) {
//     var c = await CategorySchemaModel.deleteMany(condition_obj);
//     if (c) res.status(200).json({ response: "Category deleted successfully" });
//     else res.status(500).json({ response: "server error" });
//   } else res.status(404).json({ response: "Requested resource not found...." });
// };

// export var update = async (req, res) => {
//   var condition_obj = JSON.parse(req.body.condition_obj);
//   var cDetails = await CategorySchemaModel.find(condition_obj);
//   if (cDetails.length > 0) {
//     var c = await CategorySchemaModel.updateMany(
//       JSON.parse(req.body.condition_obj),
//       { $set: JSON.parse(req.body.content_obj) }
//     );
//     if (c) res.status(200).json({ response: "Category updated successfully" });
//     else res.status(500).json({ response: "Server Error" });
//   } else res.status(404).json({ response: "Requested resource not found...." });
// };
