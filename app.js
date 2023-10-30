require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const _ = require("lodash");
const { log } = require("console");

const Razorpay = require('razorpay');
const instance = new Razorpay({ key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET })


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function (req, res) {
    res.render("home");
});


app.get("/home", function (req, res) {
    res.redirect("/");
});




app.get("/about", function (req, res) {
    res.render("about");
});


app.get("/privacy", function (req, res) {
    res.render("privacy");
});


app.get("/presets", function (req, res) {
    res.render("product");
});


app.get("/return", function (req, res) {
    res.render("return");
});


app.get("/shipping", function (req, res) {
    res.render("shipping");
});


app.get("/terms", function (req, res) {
    res.render("terms");
});

app.post("/download", function (req, res) {
    res.render("download");
});

app.get("/product", function (req, res) {
    res.render("product");
});


app.get("/checkout", function (req, res) {
    res.render("checkout");
});


app.post("/payment", async function (req, res) {

    console.log(req.body);

    var option = {
        amount: 5000,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_11"
    };

   const order = await instance.orders.create(option);

   console.log(order);

   const options = {
    orderid : order.id ,
    name : req.body.name ,
    email : req.body.email,
    contact : req.body.number,
    key  : process.env.KEY_ID

   }
   
console.log(options);

res.render("payment" , {orderId : options });


});


const port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log("server started on port 3000");
});