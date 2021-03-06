import { isEmpty, validate } from "class-validator";
import { Request, Response, Router } from "express";
import User from "../entities/User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import auth from "../middleware/auth";
 
const register =async (req:Request,res:Response)=>{
    const {email,username,password}=req.body

    try {
        //Validate data
        let errors:any={}
        const emailId=await User.findOne({email})
        const userName=await User.findOne({username})
        if(emailId)errors.email='Email already in use'
        if(userName)errors.username='Username already in use'
        if(Object.keys(errors).length>0)
        {
            return res.status(400).json(errors)
        }
        //Create the user
        const user=new User({email,password,username})
        errors=await validate(user)
        if(errors.length>0)return res.status(400).json({errors})
        await user.save()
        //Return the user
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(500).json(error);
    }
}
//login
const login=async(req:Request,res:Response)=>{
    const {username,password}=req.body
    try {
        let errors:any={}
        if(isEmpty(username))errors.username='Username must not be empty'
        if(isEmpty(password))errors.password='Password must not be empty'
        if(Object.keys(errors).length>0){
            return res.status(400).json(errors)
        }
        const user=await User.findOne({username})
        if(!user)return res.status(404).json({error:'User not found'})
        const passwordMatches=await bcrypt.compare(password,user.password)
        if(!passwordMatches)
        {
            return res.status(401).json({password:'Password is incorrect'})
        }
        const token=jwt.sign({username},'5asd4f64sadf4asdf5')
        res.set('Set-Cookie',
        cookie.serialize('token',token,{
            httpOnly:true,
            secure:false,
            sameSite:"strict",
            maxAge:3600,
            path:'/'
        }))
        return res.json({user,token})
    } catch (error) {
        console.log(error);
        return res.json({error:'Something went wrong'})
    }
}
//authenticate
const me= (_:Request,res:Response)=>{
   return res.json(res.locals.user);
}
//logout
const logout=async (_:Request,res:Response)=>{
    res.set('Set-Cookie',cookie.serialize('token','',{
        httpOnly:true,
        secure:false,
        sameSite:'strict',
        expires:new Date(0),
        path:'/',
    }))
    return res.status(200).send({success:true});
}
const profile=async(req:Request,res:Response)=>{
    const {username}=req.params;
    try {
        const data=await User.findOneOrFail({username})
        return res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:'Something went wrong'})
    }
}
const router=Router()
router.post('/register',register);
router.post('/login',login);
router.get('/me',auth,me)
router.get('/logout',auth,logout);
router.get('/')
router.get('/:username/:profile',auth,profile)
export default router;