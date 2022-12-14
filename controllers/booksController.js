const Books = require("../model/books");

exports.getAllBooks = (req, res, next) => {
  Books.find({}, (error, Books) => {
    if (error) next(error);
    req.data = Books;
    next();
  });
};

exports.getOneBooks = (req, res, next) => {
  Books.findById(req.params, (error,Books) => {
      if (error) next(error);
      req.data = Books;
      next();
  });
};

exports.delete = (req, res, next) => {
  let _id = req.params.id;
  Books.findByIdAndRemove(_id)
    .then(() => {
      res.locals.redirect = "/admin";
      next();
    })
    .catch(error => {
      console.log(`Error deleting user by ID: ${error.message}`);
      next();
    })
};

exports.redirectView = (req, res, next) => {
  let redirectPath = res.locals.redirect;
  if (redirectPath) res.redirect(redirectPath);
  else next();
};

exports.create = (req, res, next) => {
  let userParams = {
    name: req.body.name,
    author: req.body.author,
  };
  Books.create(userParams)
    .then(() => {
      res.locals.redirect = "/admin";
      next();
    })
    .catch(error => {
      console.log(`Error saving user: ${error.message}`);
      next(error);
    });
};

exports.save = (req, res, next) => {
  let id = {
    _id: req.body.ID
  }
  let userParams = {
    name: req.body.name,
    author: req.body.author,
  };
  books.findByIdAndUpdate(id, userParams)
  .then(()=> {
    res.locals.redirect = "/admin";
    next();
  })
  .catch(error => {
    console.log(`Error saving user: ${error.message}`);
    next(error);
  }); 
}




