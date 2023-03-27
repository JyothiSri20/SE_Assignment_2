var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/hello", (req,res)=>{
  res.send("Hello World");
})
router.get("/add/:first/and/:sec",(req,res)=>{
  let FirstNumber=parseInt(req.params.first),
  SecondNumber=parseInt(req.params.second),
  sum=FirstNumber+SecondNumber;
  console.log(sum);
  res.json({"addResult":sum});
});

module.exports = router;

