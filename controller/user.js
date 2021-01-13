const { restart } = require("nodemon");
const db = require("../model/dataBase");
const User = db.user;

exports.create = (req, res) => {
    const {name, email, status} = req.body;
    if(!email) {
        res.status(400).send({message: "Content cannot be left empty"})
        return;
    }
    const user = new User({
        name,
        email, 
        status: status ? status : false
    });
    user.save(user)
        .then(data => {
            res.send({user: data})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "some error occured while creating user"
            })
        })
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
        let {name, email, status} = req.body;
        const data = await User.findAndModify({
            id,
            name,
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

