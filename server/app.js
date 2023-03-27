var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

// database setup
const dataset = module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try{
    mongoose.connect(
      'mongodb+srv://saisreey20:nlFwfFZckbDj6ucJ@cluster0.nfqlisf.mongodb.net/SSY_MART?retryWrites=true&w=majority',
      connectionParams,
      );

      console.log('Database Connection is Successful');

  }catch (error) {
    console.log(error);
    console.log('Database Connection Failure');

  }
};

const InvenSchema = {
  Name: String,
  Type: String,
  Quantity: String,
  Priceperunit: String,
}

dataset();
var app = express();

const Item = mongoose.model('Item', InvenSchema, 'SSInventory');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/Inventory',async (req, res) => {
  try {
    const items = await Item.find({});
    if (items.length === 0) {
      console.log('NO Items found')
    }else{
      console.log('Items Displayed')
    }
    res.render('Inventory', {
      storeList: items
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving items');
  }
});

app.get('/update', async (req, res) => {
  try {
    const items = await Item.find({});
    if (items.length === 0) {
      console.log('NO Items found')
    }else{
      console.log('Items Displayed')
    }
    res.render('update', {
      storeList: items
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving items');
  }
});

app.get('/',async (req, res) => {
  try {
    const items = await Item.find({});
    if (items.length === 0) {
      console.log('NO Items found')
    }else{
      console.log('Items Displayed')
    }
    res.render('index', {
      storeList: items
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving items');
  }
});

app.post('/insert', async (req, res) => {
  try {
    const { Name, Type, Quantity, Priceperunit } = req.body;
    const newItem = new Item({ Name, Type, Quantity, Priceperunit });
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting item');
  }
});

app.post('/Updates', async (req, res) => {
  try {
    const { _id, Name, Type, Quantity, Priceperunit } = req.body;
    console.log(_id, Name, Type, Quantity, Priceperunit);
    const updatedItem = await Item.findByIdAndUpdate(_id, { Name, Type, Quantity, Priceperunit }, { new: true });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item');
  }
});

app.post('/management', async (req,res) =>{
  res.redirect('/Inventory');
});

app.post('/ins', async (req,res) =>{
  res.redirect('/update');
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
