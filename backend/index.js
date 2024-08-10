import { PORT, mongoDBURL } from "./config.js";
import express, { response } from "express";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cors());




app.get('/', (request, response)=>{
    res.json({
        books: [
            { _id: '1', title: 'Book Title 1', author: 'Author 1', publishYear: 2024 },
            { _id: '2', title: 'Book Title 2', author: 'Author 2', publishYear: 2023 }
        ]
    });})

app.use('/books', booksRoute);



mongoose.connect(mongoDBURL).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`App running on ${PORT}`);
    }).on("error", (err) => {
    
        console.error("Error starting server:", err);
      
        process.exit(1);
      
      });



}).catch(()=>{
    console.log(error);
})



