const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const {username, password} = req.body;
    const newUser = new User({username, password});
    
    try{
        await newUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        })
    }catch(err){
        res.status(400).json({
            message: "User not created",
            error: err
        })
    }
};

exports.login = async (req, res) => {
    const {username, password} = req.body;
    
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({
                message: "User not found"
            });
        }
        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }
        const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({
            message: "User logged in successfully",
            token
        });
    }catch(err){
        res.status(400).json({
            message: "User not logged in",
            error: err
        });
    }
}

exports.deleteUser = async (req, res) => {
    const user = 'test';
    try{
        await User.findOneAndDelete({username: user});
        res.status(200).json({
            message: "User deleted successfully"
        });
    }catch(err){
        res.status(400).json({
            message: "User not deleted",
            error: err
        });
    }
}
