const express= require("express");
const {CakeModel,validateCake}=require("../models/cakeModel");
const {auth}=require("../middlewares/auth")
const router = express.Router();

router.get("/" , async(req,res)=> {
  let perPage = Math.min(req.query.perPage,20)||5;
  let page = req.query.page||1;
 
  try{
    let data =await CakeModel
    .find({})
    .limit(perPage)
    .skip((page-1)*perPage)
    .sort({_id:-1});
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:err,err})
  }
});
router.post("/",auth,async(req,res)=>{
  let validBody = validateCake(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let cake = new CakeModel(req.body);
    cake.userId = req.tokenData._id;
    await cake.save();
    res.status(201).json(cake);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"error try again later",err});
  }
});
router.put("/:editId",auth, async(req,res) => {
  let validBody = validateCake(req.body);
  if(validBody.error){
    return res.status(400).json(validBody.error.details);
  }
  try{
    let editId = req.params.editId;
    let data = await CakeModel.updateOne({_id:editId,userId:req.tokenData._id},req.body)
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
})

router.delete("/:delId",auth, async(req,res) => {
  try{
    let delId = req.params.delId;
    let data = await CakeModel.deleteOne({_id:delId,userId:req.tokenData._id})
    res.json(data);
  }
  catch(err){
    console.log(err);
    res.status(500).json({msg:"there error try again later",err})
  }
});

module.exports = router;