import "reflect-metadata";
import {} from "typeorm";
import express from 'express'
import dotenv from 'dotenv'
import morgan from "morgan";
import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subRoutes from './routes/subs'
import trim from "./middleware/trim";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createConnection } from "net";
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

const connectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST, // Use environment variables here
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
      rejectUnauthorized: false,
    },
    synchronize: true,
    logging: true,
    entities: [
      'src/entities/**/*.ts',
    ],
    migrations: [
      'src/migrations/**/*.ts',
    ],
    subscribers: [
      'src/subscribers/**/*.ts',
    ],
    cli: {
      entitiesDir: 'src/entities',
      migrationsDir: 'src/migrations',
      subscribersDir: 'src/subscribers',
    },
  };
  
  
  app.listen(4000, async () => {
    console.log('Server running at http://localhost:4000');
  
    try {
      await createConnection(connectionOptions);  // Use the DataSource initialized above
      console.log('Db connected!');
    } catch (error) {
      console.error('Error connecting to the database:', error);
    }
  });
