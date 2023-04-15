const userModel=require("./models");
const bcrypt = require('bcryptjs')
const jwt= require("jsonwebtoken");
const user_details = require("./models");
const product = require("./modelProduct");
const JWT_SECRET= "jfasuiefhSUFI2u3ubsjkdf";


//Adding the user to database : Here
const AddUser=async(req,res)=>{
    const {name,email,gender,address,password}=await req.body
    const encryptpass= await bcrypt.hash(password,10)
    const user= new userModel({
        name: name,
        email: email,
        gender: gender,
        address: address,
        password: encryptpass,
        active :1
    })
    user.save().then(use => {
        console.log(`${use} has registered successfully`)
    }).catch(err => {console.log(`unable to register`, err)})
    .then((response)=>console.log(response))
}

//This API is used for Authentication of the USER
const LoginUser=async(req,res)=>{
    const {email, password}=await req.body
    const user = await user_details.findOne({email});
    if (!user){
        return res.json({error: "User Not Found"});
    }
    if (await bcrypt.compare(password,user.password)){
        const token= jwt.sign({},JWT_SECRET);

        if (res.status(201)){
            return res.json({status :"ok",data : tocken});
        }
        else {
            return res.json({error:"error"});
        }
    }
    res.json({status:"error",error:"Invalid"})
}

//This API is used to enable Profile View
const ProfileView=async (req,res)=>{
    const {token}= req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;
        user_details.findOne({email:useremail})
        .then((data)=>{
            console.log(data);
        })
    }
    catch(error){console.log("error")}
}

//This API is used update the profile
const ProfileUpdate = async(req,res)=>{
    const {token,name,gender,address}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;
        db.user_details.findOne({email:useremail},
            {
                $set:{
                    name: name,
                    gender:gender,
                    address:address
                }
            })
        
       
    }
    catch(error){console.log("error")}
}

//This enables Add to Cart functionality
const AddToCart=async(req,res)=>{
    const {token,ProductId}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;
        user_details.findOneAndUpdate({email:useremail},
            {
                $push:{
                    cart : ProductId
                }
            })
        
       
    }
    catch(error){console.log("error")}
}

//This enables Add to Wishlist functionality
const AddToWishlist=async(req,res)=>{
    const {token,ProductId}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET);
        const useremail=user.email;
        user_details.findOneAndUpdate({email:useremail},
            {
                $push:{
                    wishlist : ProductId
                }
            })
    }
    catch(error){console.log("error")}
}

// Enables searching in the products database
const Search=async(req,res)=>{
    const {text}=req.body;
    try{
        const items = db.Products.find({$text:{$search : text}})
        console.log(items)
    }
    catch(error){console.log("error")}
}

//Filtering with repect to the price
const priceSearch=async(req,res)=>{
    const {price_input}=req.body;
    try{
        // gives all the products having price greater than the specified number
        const items = product.find({price:{$gte:price_input}})
        console.log(items)
    }
    catch(error){console.log("error")}
}

// Module exports 
module.exports={
    AddUser,
    LoginUser,
    ProfileView,
    ProfileUpdate,
    AddToCart,
    AddToWishlist,
    Search,
    priceSearch
}