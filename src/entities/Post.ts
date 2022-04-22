import {Entity as TOEntity, Column, Index, BeforeInsert, ManyToOne, JoinColumn, OneToMany} from "typeorm";
import { makeId } from "../utils/helpers";
import Entity from "./Entity";
import User from "./User";
import {slugify} from '../utils/helpers';
import Sub from "./Sub";
import Comment from "./Comment";
@TOEntity('posts')
export default class Post extends Entity{
    constructor(post:Partial<Post>){
        super()
        Object.assign(this,post)
    }
    @Column()
    identifier:string //7 character id

    @Column()
    title:string

    @Index()
    @Column()
    slug:string

    @Column({nullable:true,type:'text'})
    body:string

    @Column()
    subName:string

    @Column({nullable:true,type:'integer'})
    likes:number

    @Column({nullable:true,type:'integer'})
    dislikes:number
    @ManyToOne(()=>User,(user)=>user.posts)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user:User

    @ManyToOne(()=>Sub,(sub)=>sub.posts)
    @JoinColumn({name:'subName',referencedColumnName:'name'})
    sub:Sub

    @OneToMany(()=>Comment,comment=>comment.post)
    comments:Comment[]
    
    @BeforeInsert()
    makeIdAndSlug(){
        this.identifier=makeId(7);
        this.slug=slugify(this.title);
    }
}

