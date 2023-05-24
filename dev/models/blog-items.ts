// За счет Schema описываем коллекцию, которая будет создана
import { Schema, model } from "mongoose";

const BlogItems = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    anons: {
        type: String,
        required: true
    },
    full_text: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    published: {
        type: Date,
        require: false,
        default: Date.now()
    }
})
 
// Эспортируем модель 'items', с описанием в 'BlogItems' 
export const Items = model('articles', BlogItems)