const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
const port = 5000;
require("dotenv").config();
const controllersUser = require("./ControllersUser")
const controllersAdmin=require("./ControllersAdmin")
app.use(cors());

mongoose.connect(process.env.Mongo_url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// User API's
app.post("/",controllersUser.AddUser)
app.post("/login",controllersUser.LoginUser)
app.post("/view",controllersUser.ProfileView)
app.post("/update",controllersUser.ProfileUpdate)
app.post("/cart",controllersUser.AddToCart)
app.put("/wishlist",controllersUser.AddToWishlist)
app.post("/search",controllersUser.Search)
app.post("/priceFilter",controllersUser.priceSearch)

// Admin API's 
app.post("/admin/",controllersAdmin.AddAdmin)
app.post("/admin/login",controllersAdmin.LoginAdmin)
app.post("/admin/create",controllersAdmin.CreateProduct)
app.put("/admin/update",controllersAdmin.UpdateProduct)
app.post("/adimin/delete",controllersAdmin.DeleteProduct)
app.post("/admin/suspend",controllersAdmin.AccountSuspend)
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))