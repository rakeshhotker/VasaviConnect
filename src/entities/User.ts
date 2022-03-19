import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, BeforeInsert} from "typeorm";
import {IsEmail, Length} from 'class-validator';
import bcrypt from 'bcrypt';
import {Exclude, instanceToPlain} from 'class-transformer';
@Entity('users')
export class User extends BaseEntity{
    constructor(user:Partial<User>){
        super()
        Object.assign(this,user)
    }
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn()
    createAt:Date

    @CreateDateColumn()
    updateAt:Date

    @BeforeInsert()
    async hashPassword(){
        this.password=await bcrypt.hash(this.password,6)
    }
    toJSON(){
        return instanceToPlain(this)
    }
}
