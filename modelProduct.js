const mongoose=require("mongoose");
const Product=new mongoose.Schema({
        _id:mongoose.Schema.Types.ObjectId,
        name: String,
        description: String,
        price: Number
})
const product=mongoose.model('Products',Product)
module.exports=product