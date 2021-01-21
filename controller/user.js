const {loginValidn, signupValidn} = require('../model/joiSchema')
const byCrypT = require('bcrypt')
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const db = require("../model/dataBase");

const secret = process.env.ACCESS_TOKEN_SECRET
const User = db.user;

exports.verifyToken = (req, res, next) => {
    const token = req.header('auth');
    if (!token) 
        return res.status(401).send('access denied');
    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next()
    } catch (error) {
        res.status(400).send('invalid token')
    }
}

exports.signup = async (req, res) => {
    const {userName, password, confirmPwd, email, status} = req.body;
    const salt = await byCrypT.genSalt(10);
    const hashPwd = await byCrypT.hash(password, salt)
    const hashComPwd = await byCrypT.hash(confirmPwd, salt)
    const {error} = signupValidn.validate(req.body)
    if (error) 
        return res.status(400).send(error.details[0].message);    
    const emailExist = await User.findOne({email});
    console.log(emailExist)
    if (emailExist) {
        return res.status(400).send('email already exist');   
    } else {
        const user = new User({
        userName,
        password: hashPwd, 
        confirmPwd: hashComPwd,
        email, 
        status: status ? status : false
            });
        user.save(user)
            .then(data => {
                res.send({user: user._id})
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "some error occured while creating user"
                })
            })
    }
    
};

exports.login = async (req, res) => {
    const {password, email} = req.body;
    const {error} = loginValidn.validate(req.body)
    if (error) 
        return res.status(400).send(error.details[0].message); 
    const user = await User.findOne({email});    
    const passIsValid = byCrypT.compareSync(password, user.password);  
    //     
    if (!passIsValid) {
        return res.status(400).send('password is incorrect');   
    }
    if (!user) {
        return res.status(400).send('email is incorrect');   
    }   
    var token = jwt.sign({ id: '_id' }, secret);
    return res.header('auth', token).send(token)
    
};

 exports.findAll = async (req, res) => {
     try {
         const user = await User.find({});
         res.send({users: user})
     } catch(error) {
         res.status(500).send({
             message: error.message || "soething went wrong"
         })
     }
 };

exports.findOne = async (req, res) => {
    const {id} = req.params;
    try {
        let data = await User.findById(id);
        res.send({user: data})        
    } catch (error) {
        res.status(500)
            .send({message: "error retrieving"})
    }
}

exports.update = async (req, res) => {
    try {
        const {id} = req.params;
        let {userName, pwd, confirmPwd, email, status} = req.body;
        const data = await User.findAndModify({
            id,
            userName,
            pwd,
            confirmPwd,
            email, 
            status
        }, {new: true});
        res.send({user: data})
    } catch (error) {
        res.status(500)
            .send({message: "error retrieving"})
    }
   
}

exports.delete = async (req, res) => {
    let {id} = req.params;
    try {
        await User.findByIdAndDelete(id)
        res.status(200).send()
    } catch (error) {
        res.status(500)
            .send({message: "error retrieving"})
    }
}

exports.deleteAll = async (req, res) => {
    try {
        await User.deleteMany({})
        res.status(200).send()
    } catch (error) {
        res.status(500)
            .send({message: "error retrieving"})
    }
}

