import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String, 
            required: true,
        }, authour: {
            type: String, 
            required: true,
        }, publishYear: {
            type: Number, 
            required: true,
        },
       
    },
    {
            Timestamp: true,
        }
);


export const Book = mongoose.model('Book', bookSchema)