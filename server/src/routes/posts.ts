import { Router,Request, Response } from "express"
import { textSearchByFields } from "typeorm-text-search";
import { getRepository } from "typeorm";
import Comment from "../entities/Comment";
import Post from "../entities/Post";
import Sub from "../entities/Sub";
import auth from '../middleware/auth'

const createPost = async (req:Request,res:Response) => {
    var Sentiment=require('sentiment');
    var sentiment=new Sentiment();
    const {title,body,sub} = req.body;
    const likes=0;
    const dislikes=0;
    const user=res.locals.user;
    var result=sentiment.analyze(body)
    var result1=sentiment.analyze(title)
    if(result.score<0 || result1.score<0){
        console.log(result.score,result1.score)
        return res.status(418).json("Your post doesn't obey our guidelines")
    }
    if(title.trim()===''){
        return res.status(400).json({title:'Title must not be empty'})
    }
    try {
        const subRecord=await Sub.findOneOrFail({name:sub})//finding sub
        const post=new Post({title,body,user,sub:subRecord,likes,dislikes});
        await post.save()
        return res.status(200).json(post);
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
const getPostSearch=async(req:Request,res:Response)=>{
    const {text}=req.params;
    console.log(text)
    try {
        const queryBuilder=getRepository(Post).createQueryBuilder("post");
        textSearchByFields<Post>(queryBuilder,text,['body','title','username'])
        const posts=await queryBuilder.getMany()
        return res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        return res.status(404).json({error:'Post not found'})
    }
}
const getPostforSub=async(req:Request,res:Response)=>{
    const {name}=req.params;
    try {
        const sub=await Sub.findOneOrFail({name})
        const data=await Post.find({
            where:{sub},
            order:{createdAt:'DESC'}
        })
        return res.status(200).json(data)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({error:error.message})
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
const getPostComments=async(req:Request,res:Response)=>{
    const {identifier,slug}=req.params;
    try {
        const post=await Post.findOneOrFail({identifier,slug})
        const comments=await Comment.find({
            where:{post},
            order:{createdAt:'DESC'}
        })
        return res.json(comments)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Something went wrong'});
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
router.get('/:text/search',getPostSearch)
router.get('/:name/posts',getPostforSub)
router.post('/:identifier/:slug/comments',auth,commentOnPost)
router.get('/:identifier/:slug/comments',auth,getPostComments)
router.post('/:identifier/:slug/like',likePost)
router.post('/:identifier/:slug/dislike',dislikePost);
export default router