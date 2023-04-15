const mongoose=require("mongoose");
const Signup=new mongoose.Schema({
        name: String,
        email: {type: String , unique: true},
        gender: String,
        address: String,
        password: String,
        cart :Array,
        wishlist: Array,
        active:Number // 1 for active account , 0 for suspended account
})
const user_details=mongoose.model('user_details',Signup)
module.exports=user_details