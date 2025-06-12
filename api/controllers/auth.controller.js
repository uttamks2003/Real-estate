import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs'
import {errorHandler} from '../utils/error.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
const HASH_PASSWORD_TIMES = 10;
const SECRET_KEY = process.env.JWT_SECRET ;

export const signup = async (req , res, next)=>{
    const {username , email, password} = req.body;
    const hasedPassword = bcryptjs.hashSync(
      password,
      HASH_PASSWORD_TIMES
    );
    const newUser = new User({ username, email, password:hasedPassword });
    try {
        await newUser.save();
        res.status(201).json({"Message":"User registered successfully"})
    } catch (error) {
        next(error);
    }
}

export const signin = async (req , res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({"Message":"Please provide username and password"})
    }
    try{
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404 , 'User Not found'));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "Invalid Credentials!"));
        
        const token = jwt.sign({id:validUser._id}, SECRET_KEY);
        const {password:pass, ...rest} = validUser._doc;
        res.cookie('access_token', token , {httpOnly:true}).status(200).json(rest);
    }catch(err){
        next(err)
    }
};

export const google = async (req , res, next)=>{
    try {
        const user = await User.findOne({email:req.body.email})
        if(user){
            const token = jwt.sign({ id: user._id }, SECRET_KEY);
            const { password: pass, ...rest } = user._doc;
            res.cookie('access_token', token , {httpOnly:true}).status(200).json(rest);
        }else{
            const generatedPassword =
              Math.random().toString(36).slice(-8) +
              Math.random().toString(36).slice(-8);
            const hasedPassword = bcryptjs.hashSync(
                generatedPassword,
                HASH_PASSWORD_TIMES
                );  
            const newUser = new User({
              username:
                req.body.name.split(" ").join("").toLowerCase() +
                Math.random().toString(36).slice(-8),
              email: req.body.email,
              password: hasedPassword,
              avatar:req.body.photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, SECRET_KEY);
            const { password: pass, ...rest } = newUser._doc;
            res.cookie('access_token', token , {httpOnly:true}).status(200).json(rest);
        }
    } catch (error) {
        next(error);
    }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been logged out successfull");
  } catch (error) {
    next(errorHandler(401, error));
  }
};