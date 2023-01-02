import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import dotenv from 'dotenv'
import morgan from "morgan";
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subRoutes from './routes/subs'
import trim from "./middleware/trim";
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config()
const app=express()
app.use(express.json())
app.use(morgan('dev'))
app.use(trim);
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000',
    optionsSuccessStatus:200,
}))
app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/subs',subRoutes)
app.get('/',(_,res)=>{
    res.send("Hello Wordd");
})

app.listen(4000,async()=>{
    console.log('Server running at http://localhost:4000')

    try {
        await createConnection()
        console.log('Db connected!')
    } catch (error) {
        console.log(error);
    }
})