import { Request, Response, Router } from "express";
import User from "../entities/User";
import auth from "../middleware/auth";
import { isEmpty } from "class-validator";
import { getRepository } from "typeorm";
import Sub from "../entities/Sub";
const createSub=async(req:Request,res:Response)=>{
    const {name,title,description}=req.body;

    const user:User=res.locals.user;
    try {
        let errors:any={}
        if(isEmpty(name))errors.name='Name must not be empty'
        if(isEmpty(title))errors.title='Title must not be empty'
        const sub=await getRepository(Sub)
             .createQueryBuilder('sub')
             .where('lower(sub.name)=:name',{name:name.toLowerCase()})
             .getOne()
        if(sub)errors.name='Sub already exists'
        if(Object.keys(errors).length>0){
            throw errors
        }
    } catch (error) {
        console.log(error)
        return res.status(400).json(error);
    }
    try {
        const sub=new Sub({name,description,title,user})
        await sub.save()
        return res.json(sub)
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Something went wrong'})
    }
}
const getAllSubs=async(_:Request,res:Response)=>{
    try {
        const data=await Sub.find({
            order:{createdAt:'DESC'}
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
    }
}
const router=Router()
router.post('/',auth,createSub)
router.get('/',auth,getAllSubs)
export default router