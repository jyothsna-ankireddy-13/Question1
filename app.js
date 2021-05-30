
const express = require('express');
const app = express();
var mongoose = require('mongoose');
mongoose
  .connect('mongodb://localhost:27017/Month09',
  {useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoDB is connected"))
  .catch((err) => console.log(err));

const controllers = require('./routers/router');
app.use('/',controllers);
app.use(express.static('public'));
app.set('view engine','hbs');

//health check
app.get('/',(req, res) =>{
  res.render('signup');
});

app.get('/UserSignup',(req, res) =>{
  res.render('signup');
});

app.get('/UserLogin',(req, res) =>{
  res.render('login');
});
const port = process.env.PORT || 1111;
app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Server is running on port ${port}`);
});