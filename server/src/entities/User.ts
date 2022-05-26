import {Entity as TOEntity, Column, Index, BeforeInsert, OneToMany} from "typeorm";
import {IsEmail, Length} from 'class-validator';
import bcrypt from 'bcrypt';
import {Exclude} from 'class-transformer';
import Entity from "./Entity";
import Post from "./Post";
@TOEntity('users')
export default class User extends Entity{
    constructor(user:Partial<User>){
        super()
        Object.assign(this,user)
    }

    @Index()
    @IsEmail()
    @Column({unique:true})
    email:string

    @Index()
    @Length(6,255)
    @Column({unique:true})
    username:string

    @Exclude()
    @Length(6,255)
    @Column()
    password:string

    @Column({nullable:true,type:'text'})
    @Length(10,255)
    About:string

    @Column({nullable:true,type:'text'})
    AreasofInterest:[]
    @OneToMany(()=>Post,post=>post.user)
    posts:Post[]

    @BeforeInsert()
    async hashPassword(){
        this.password=await bcrypt.hash(this.password,6)
    }
}
