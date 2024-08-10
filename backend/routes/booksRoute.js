import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

router.get('/', async (request, response) => {
    try {
      const books = await Book.find({});
  
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

router.get('/:id', async (request, response)=>{
    try {
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500);
    }
})
router.put('/:id', async (request, response)=>{
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).send({
                message : "error, result is invalid"
            })
        }
        return response.status(200).send({
            message : "successfully updated"
        })


        return response.status(200).json(result);
        
    } catch (error) {
        console.log(error.message);
        response.status(500);
    }
})
router.delete('/:id', async (request, response)=>{
    try {
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).send({
                message : "error, result is invalid"
            })
        }
        return response.status(200).send({
            message : "successfully deleted"
        })


        return response.status(200).json(result);
        
    } catch (error) {
        console.log(error.message);
        response.status(500);
    }
})

router.post('/', async (request, response)=>{
    try {
        if(
            !request.body.title||
            !request.body.authour||
            !request.body.publishYear
        ){
            return response.status(404).send({
                message : "Send all requiredb fields, author, publishYear",
            })


}
const newBook = {
    title: request.body.title, 
    authour: request.body.authour,
    publishYear: request.body.publishYear
}
const book = await Book.create(newBook)
return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500);
        
    }
})

export default router;