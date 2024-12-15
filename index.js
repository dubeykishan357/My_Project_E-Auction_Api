import express from "express";
import bodyParser from "body-parser";

var app = express();

import userRouter from "./route/user.router.js";
import CategoryRouter from "./route/category.router.js";
import SubCategoryRouter from "./route/subcategory.router.js";
import ProductRouter from "./route/product.router.js"
import cors from "cors";
import fileUpload from "express-fileupload";
import BidRouter from "./route/bid.router.js";

app.use(cors());

//configuration to fetch file resources
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/user",userRouter);
app.use("/category",CategoryRouter);
app.use("/subcategory",SubCategoryRouter);
app.use("/product",ProductRouter);
app.use("/bid",BidRouter);

app.listen(3001);
console.log("server started");