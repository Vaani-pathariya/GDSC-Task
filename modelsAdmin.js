const mongoose=require("mongoose");
const Signup=new mongoose.Schema({
        name: String,
        email: {type: String , unique: true},
        address: String,
        password: String,
        productsIds: Array
})
const admin_details=mongoose.model('Admin_details',Signup)
module.exports=admin_details