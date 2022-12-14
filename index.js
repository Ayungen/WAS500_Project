const express = require('express');
const app = express();
const BooksController = require("./controllers/booksController");
const mongoose = require ("mongoose");
mongoose.connect(
    "mongodb+srv://andy:anotherpassword@cluster0.jnfns2p.mongodb.net/?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
);

app.get("/:id/delete", BooksController.delete);
const db = mongoose.connection;
db.once("open", () => {
    console.log("Ah! connected to MongoDB using Mongoose!!");
});
const Books = require('./model/books.js');

app.set('views', './views');
app.set('view engine', 'ejs');
app.use('/public/image', express.static('./public/image'))



const methodOverride = require("method-override");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"]
  })
);
//ROUTES
//Index Page
app.get('/', (req, res) => {
    res.render('index');
})

//Books
app.get('/bookslist', (req, res) => {
    res.render('books');
})


app.get("/books/:_id", BooksController.getOneBooks, (req, res) => {
    //res.send(req.data);
    res.render('temp', {books: req.data})
});


app.get("/edit/:_id", BooksController.getOneBooks, (req, res, next) => {
    res.render('addbooks', {books: req.data});
    console.log(books)
});

app.get('/admin', BooksController.getAllBooks, (req, res) => {
    res.render('admin', {books: req.data})
});

app.get("/delete/:id", BooksController.delete, BooksController.redirectView);


app.get('/addnewbook', (req, res) => {
    res.render('addbook');
})

app.post("/addnewbook/save", BooksController.create, BooksController.redirectView);


// Error Page
app.get("*", (req,res) => {
    res.render("error")
});

//Listen
app.listen(3000, function(req, res) {
    console.log("Connected on port:3000");
  });