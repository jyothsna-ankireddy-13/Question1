const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../model/UserSchema');
router.use(express.urlencoded({extended:true}));
router.use(express.json());

//user register
router.post('/UserSignup',async(req,res) => {
    var hashpassword = bcrypt.hashSync(req.body.password,6);

    //verify email and phone_number
    var email =await User.findOne({email: req.body.email});
    if(email){
        return res.send('SORRY This email already registered');
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashpassword,
        about:req.body.about,
    },(err,user) => {
        if(err) throw err;
        res.status(200).send('Registration Success');
        render('/User');
    });
});

//login user

router.post('/UserLogin',(req,res) => {
    User.findOne({email:req.body.email},(err,data) => {
        if(err) return res.status(500).send("Error while Login");
        if(!data) return res.send({auth:false,token:'No User Found Register First'});
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,data.password);
            if(!passIsValid) return res.send({auth:false,token:'Invalid Password'});
            var token = jwt.sign({id:data._id},'mysecret',{expiresIn:3600});
            if(!token) res.send({auth:false,token:'No Token Provided'});
            jwt.verify(token,'mysecret',(err,data) => {
                if(err) res.send('Error while fetching');
                User.findById(data.id,(err,result) => {
                    res.send(result);
                    render('/User');
                });
            });

        }
    });
});

// get all users
router.get('/users',(req,res) =>{
    User.find({},(err,user) => {
        if(err) throw err;
        res.status(200).send(user);
    });
});

module.exports = router;