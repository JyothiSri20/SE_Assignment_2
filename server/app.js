var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const mongoose = require('mongoose');

const axios = require('axios');

// database setup
const database = module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try{
    mongoose.connect(
      'mongodb+srv://jyothisree:pmftKW8IwYShzUgm@cluster0.nz0cxpz.mongodb.net/Jyomart?retryWrites=true&w=majority',
      connectionParams,
      );

      console.log('Database Connection is Successful');

  }catch (error) {
    console.log(error);
    console.log('Database Connection Failure');

  }
};

const itemschema = {
  Name: String,
  Quantity: String,
  Priceperunit: String,
}

const getPosts = async () => {
  try {
    const response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json');
    const posts = response.data.Results.slice(0, 10);
    return posts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

module.exports = {
  getPosts,
};

database();
var app = express();

const Item = mongoose.model('Item', itemschema, 'Inventory');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/api',async (req, res) => {
  try {
    const items = await getPosts();
    res.render('api', {
      apiItems: items
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving items');
  }
});

app.post('/api', async (req,res) =>{
  res.redirect('/api');
});

app.post('/insert', async (req, res) => {
  try {
    const { Name, Quantity, Priceperunit } = req.body;
    const newItem = new Item({ Name, Quantity, Priceperunit });
    await newItem.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error inserting item');
  }
});

app.post('/update', async (req, res) => {
  try {
    const { _id, Name, Quantity, Priceperunit } = req.body;
    console.log(_id, Name, Quantity, Priceperunit);
    const updatedItem = await Item.findByIdAndUpdate(_id, { Name, Quantity, Priceperunit }, { new: true });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating item');
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
