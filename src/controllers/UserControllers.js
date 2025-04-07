const { genSaltSync } = require('bcrypt')
const userModel = require('../models/UserModels')
const bcrypt = require('bcrypt')
const mailUtil = require('../util/MailUtils')
const jwt = require('jsonwebtoken')
const secret = "badal"

const addUser = async(req,res)=>{
        const user = await userModel.create(req.body)

        res.json({
            message:"User is created",
            data : user
        })
        
}

const getUser = async(req,res)=>{
    const savedUser =  await userModel.find().populate("roleId", "roleName -_id")

    res.json({
        message:"all the Users are fetched !",
        data:savedUser
    })
}

const deleteUser = async(req,res)=>{
        const deleted = await userModel.findByIdAndDelete(req.params.id)
        res.json({
            message:"user is deleted.......",
            data:deleted
        })
}

const getUserId = async(req,res)=>{
        const getId = await userModel.findById(req.params.id)     
        res.json({
            message:"user Id is fetched !!",
            data : getId
        })
}

const loginUser = async(req,res)=>{

    const email = req.body.email;
    const password = req.body.password
    const foundUserFromEmail = await userModel.findOne({email:email}).populate("roleId")
    console.log(foundUserFromEmail)
    if(foundUserFromEmail != null){
        const isMatch = bcrypt.compareSync(password,foundUserFromEmail.password)
        if(isMatch == true ){
            res.status(200).json({
                message:"login success...",
                data: foundUserFromEmail,
            })
        }else{
            res.status(404).json({
                message:"invalid password..."
            })
        }
    }else{
        res.status(404).json({
            message:"email not found"   
        })
    }
}

const signUp = async(req,res)=>{

        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hashedPassword
        const createdUser= await userModel.create(req.body)
        //send mail 
        await mailUtil.sendingMail(createdUser.email,"welcome to resume.x","welcome to our world")

        
        res.status(201).json({
                    message:"user creted",
                    data:createdUser
        })
}

const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const foundUser = await userModel.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ message: "User not found. Register first..." });
        }

        const token = jwt.sign({ _id: foundUser._id }, secret, { expiresIn: '10m' });

        const url = `http://localhost:5173/resetpassword/${token}`;

        const mailContent = `
            <html>
                <p>Click the link below to reset your password:</p>
                <a href="${url}">Reset Password</a>
            </html>`;

        await mailUtil.sendingMail(foundUser.email, "Reset Password", mailContent);

        res.json({ message: "Reset password link sent to your email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const decoded = jwt.verify(token, secret);
        if (!decoded._id) {
            return res.status(400).json({ message: "Invalid or expired token" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        await userModel.findByIdAndUpdate(decoded._id, { password: hashedPassword });

        res.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports = {addUser,getUser,deleteUser,getUserId ,signUp,loginUser , forgetPassword, resetPassword}