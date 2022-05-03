import { Router,Request, Response } from "express"
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import auth from '../middleware/auth'
const createPost = async (req:Request,res:Response) => {
    const {title,body,sub} = req.body;
    const likes=0;
    const dislikes=0;
    const user=res.locals.user;
    if(title.trim()===''){
        return res.status(400).json({title:'Title must not be empty'})
    }
    try {
        const subRecord=await Sub.findOneOrFail({name:sub})//finding sub
        const post=new Post({title,body,user,sub:subRecord,likes,dislikes});
        await post.save()
        return res.json(post);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error:'Something went wrong'})
    }
}
const getPosts=async (_:Request,res:Response)=>{
    try {
        const posts=await Post.find({
            order:{createdAt:'DESC'},
        });
        return res.json(posts)
    } catch (error) {
        return res.status(500).json({error:'Something went wrong'})
    }
}
const getPost=async(req:Request,res:Response)=>{
    const {slug}=req.params;
    console.log(slug)
    try {
        const post=await Post.findOneOrFail({slug},{relations:['sub']})
        return res.json(post)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error:'Post not found'})
    }
}
const commentOnPost=async(req:Request,res:Response)=>{
    const {identifier,slug}=req.params
    const body=req.body.body
    try {
        const post=await Post.findOneOrFail({identifier,slug})
        const comment=new Comment({
            body,
            user:res.locals.user,
            post
        })
        await comment.save()
        return res.json(comment)
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:'Post not found'})
    }
}
const likePost=async(req:Request,res:Response)=>{
    const {identifier,slug}=req.params
    try {
        const post=await Post.findOneOrFail({identifier,slug})
        post.likes++;
        await Post.save(post)
        return res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:'Post not found'})
    }
}
const dislikePost=async(req:Request,res:Response)=>{
    const {identifier,slug}=req.params
    try {
        const post=await Post.findOneOrFail({identifier,slug})
        post.dislikes++;
        await Post.save(post)
        return res.json(post)
    } catch (error) {
        console.log(error);
        return res.status(404).json({error:'Post not found'})
    }
}
const router=Router()
router.post('/',auth,createPost)
router.get('/',getPosts);
router.get('/:slug/search',getPost)
router.post('/:identifier/:slug/comments',auth,commentOnPost)
router.post('/:identifier/:slug/like',likePost)
router.post('/:identifier/:slug/dislike',dislikePost);
export default router