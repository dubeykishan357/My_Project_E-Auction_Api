import '../modal/conection.js';
import userSchemaModel from '../modal/user.modal.js';
import Randomstring from 'randomstring';
import jwt from 'jsonwebtoken'
import SendEmail from './email.controller.js';

// export var test = async(req,res) => {
//   res.send("success");
// }

export var save = async(req,res)=>{
var userList=await userSchemaModel.find();
var size=userList.length;
var _id;
if (size==0) {
  _id=1
} else {
  _id=userList[size-1]._id+1;
}
 var  userDetails={...req.body,"_id":_id,"status":0,"role":"user","info":Date()}
  try{
 var user =await userSchemaModel.create(userDetails);
SendEmail(user.email, user.password);

  res.status(201).json({"status":true})
}

catch (error){
  res.status(500).json({"status":false,"error":error.message})
}
}


export var login=async(req,res)=>{
  var condition_obj={...req.body,"status":1};
  var userDetails=await userSchemaModel.findOne(condition_obj);
  if(userDetails)
  {
   var payload = {"subject":userDetails.email};
   var key = Randomstring.generate();    
   var token=jwt.sign(payload,key);
   res.status(200).json({"token":token,"userDetails":userDetails}); 
  } 
  else
   res.status(404).json({"token":"error"});
 };
 
export var fetch=async(req,res)=>{
var condition_obj= req.query.condition_obj;
var userDetails=await userSchemaModel.find(condition_obj);
if(userDetails.length>0){

  res.status(200).json({"status":userDetails});
}
else{
  res.status(404).json({"response":"response resource not found"})
}
}
export var deleteUser=async(req,res)=>{
  // console.log(req.body);
  // console.log(condition_obj);
  var condition_obj=req.body;
  var userDetails=await userSchemaModel.find(condition_obj);
 console.log(userDetails);
  if(userDetails.length>0){
    var deleteUser=await userSchemaModel.deleteOne(condition_obj)  
    res.status(200).json({"status":true,"response":deleteUser})
  }
else{
  res.status(404).json({"status":false})

}
}
export var update=async(req,res)=>{
  var condition_obj=req.body.condition_obj;
  console.log(condition_obj);
  var userDetails=await userSchemaModel.find(condition_obj);  
  console.log(userDetails);
  if(userDetails.length>0)
  {
    var user=await userSchemaModel.updateMany(req.body.condition_obj,{$set: req.body.content_obj});
    if(user)
      res.status(200).json({"response":"User updated successfully"});
    else
      res.status(500).json({"response": "Server Error"});  
  }
  else
    res.status(404).json({"response":"Requested resource not found...."});  
};

  

