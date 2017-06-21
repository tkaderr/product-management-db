var express = require("express");
var app = express();
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/prod_management');

var ProductSchema = new mongoose.Schema({
 title: String,
 price: String
}, {timestamps: true})
mongoose.model('Product', ProductSchema); // We are setting this Schema in our Models as 'User'
var Product = mongoose.model('Product')

//body-parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());

//path
var path = require("path");
app.use(express.static(path.join(__dirname, './product-management/dist')));

//routes

// retrieve all
app.get('/products', function(req, res) {
    Product.find({}, function(err, data){
        console.log("data", data)
        res.json(data);
    })
})

// create 
app.post('/products', function(req, res){
    Product.create(req.body)
    .then((data) => {console.log("addded successfully", data); res.json(data);})
    .catch((err) => {console.log(err)});

});

//edit- retrieve one
app.get('/one/products/:id', function(req, res){
  Product.find({ _id: req.params.id }, function(err, data) {
    if (err) { console.log(err); }
    res.json(data);
  });
});

// update one
app.put('/edit/products/:id', function(req, res){
    console.log("server edit id", req.params.id)
  Product.update({_id: req.params.id}, req.body)
    .then(response => {res.json(response)})
    .catch(err=>console.log('error at update products',err))
})


//destroy
app.put('/destroy/products/:id', function(req, res){
    console.log("in server:", req.body)
  Product.remove({_id: req.params.id})
    .then(response => {res.json(response)})
    .catch(err=>console.log('error at delete products',err))
})


//catch all
app.all("*", (req,res,next) => {
        res.sendfile(path.resolve("./product-management/dist/index.html"))
    });


//connection listening
app.listen(8000, function() {
    console.log("listening on port 8000");
})
