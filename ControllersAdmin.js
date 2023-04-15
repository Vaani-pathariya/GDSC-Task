const userModel=require("./models");
const bcrypt = require('bcryptjs')
const jwt= require("jsonwebtoken");
const adminModel=require("./modelsAdmin");
const JWT_SECRET= "jfasuiefhSUFI2u3ubsjkdf";
const productmodel = require("./modelProduct")

// This API adds admin to the database
const AddAdmin=async(req,res)=>{

    const {name,email,address,password}=await req.body
    const encryptpass= await bcrypt.hash(password,10)
    const user= new adminModel({
        name: name,
        email: email,
        address: address,
        password: encryptpass,
        productsIds:[]
    })
    user.save().then(use => {
        console.log(`${use} has registered successfully`)
    }).catch(err => {console.log(`unable to register`, err)})
    .then((response)=>console.log(response))
}

//This api is used for Authentication of admin
const LoginAdmin=async(req,res)=>{
    const {email, password}=await req.body
    const user = await admin_details.findOne({email});
    if (!user){
        return res.json({error: "User Not Found"});
    }
    if (await bcrypt.compare(password,user.password)){
        const token= jwt.sign({},JWT_SECRET);

        if (res.status(201)){
            return res.json({status :"ok",data : token});
        }
        else {
            return res.json({error:"error"});
        }
    }
    res.json({status:"error",error:"Invalid"})
}

//This Api is used for creating the Product
const CreateProduct= async(req,res)=>{
    const {name,description,price}=await req.body
    const user= new productmodel({
        name: name,
        description: description,
        price: price,
    })
    user.save().then(use => {
        console.log(`${use} has registered successfully`)
        try{
            const userNow=jwt.verify(token,JWT_SECRET);
            const useremail=userNow.email;
            admin_details.findOneAndUpdate({email:useremail},
                {
                    $push:{
                        productsIds : user._id
                    }
                })
        }
        catch(error){console.log("error")}
    }).catch(err => {console.log(`unable to register`, err)})
    .then((response)=>console.log(response))
}

//This Api is used for updating the product
const UpdateProduct=async(req,res)=>{
    const {name,description,price,_id}=req.body;
    try{
        db.Products.findOne({_id:_id},
            {
                $set:{
                    name: name,
                    description:description,
                    price:price
                }
            })
        
       
    }
    catch(error){console.log("error")}
}

//This API is used for deleting the product
const DeleteProduct=async(req,res)=>{
    const {id}=req.body;
    try{
        db.Products.deleteOne({_id:id});
    }
    catch(error){console.log("error")};
}

//Suspends the user's account
const AccountSuspend=async (req,res)=>{
    const {email}=req.body;
    try{
        db.user_details.findOne({email:email},
            {
                $set:{
                    active : 0
                }
            })
    }
    catch(error){console.log(error)}
}

//Module exports here:
module.exports={
    AddAdmin,
    LoginAdmin,
    CreateProduct,
    UpdateProduct,
    DeleteProduct,
    AccountSuspend
}