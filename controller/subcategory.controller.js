import "../modal/conection.js";
import rs from "randomstring";
import SubCategorySchemaModel from "../modal/subcategory.model.js";
import url from "url";
import path from "path";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export var save = async (req, res) => {
  var scList = await SubCategorySchemaModel.find();
  // console.log(scList);

  var l = scList.length;
  var _id = l == 0 ? 1 : scList[l - 1]._id + 1;
  // console.log(req.files.caticon);
  var subcaticon = req.files.subcaticon;
  var subcaticonnm = Date.now() + "-" + rs.generate(15) + "-" + subcaticon.name;
  var uploadpath = path.join(
    __dirname,
    "../../UI/public/assets/upload/subcaticon",
    subcaticonnm
  );


  var scDetails = { ...req.body, "subcaticonnm": subcaticonnm, _id: _id };
  try {
    await SubCategorySchemaModel.create(scDetails);
    subcaticon.mv(uploadpath);
    res.status(201).json({ status: true });
  } catch (error) {
    res.status(500).json({ status: false });
  }
};

export var fetch = async (req, res) => {
  var condition_obj = req.query.condition_obj;;
  var scDetails = await SubCategorySchemaModel.find(condition_obj);
  // console.log(scDetails);

  if (scDetails.length > 0)
    res.status(200).json(scDetails);
  else
    res.status(404).json({ response: "Requested resource not found...." });
};

// export var deleteCategory = async (req, res) => {
//   var condition_obj = JSON.parse(req.body.condition_obj);
//   var cDetails = await SubCategorySchemaModel.find(condition_obj);
//   if (cDetails.length > 0) {
//     var c = await SubCategorySchemaModel.deleteMany(condition_obj);
//     if (c) res.status(200).json({ response: "Category deleted successfully" });
//     else res.status(500).json({ response: "server error" });
//   } else res.status(404).json({ response: "Requested resource not found...." });
// };

// export var update = async (req, res) => {
//   var condition_obj = JSON.parse(req.body.condition_obj);
//   var cDetails = await SubCategorySchemaModel.find(condition_obj);
//   if (cDetails.length > 0) {
//     var c = await SubCategorySchemaModel.updateMany(
//       JSON.parse(req.body.condition_obj),
//       { $set: JSON.parse(req.body.content_obj) }
//     );
//     if (c) res.status(200).json({ response: "Category updated successfully" });
//     else res.status(500).json({ response: "Server Error" });
//   } else res.status(404).json({ response: "Requested resource not found...." });
// };
