import { Schema, model } from 'mongoose'

// описываем корзину купленных товаров: 'id' + количество
const CommentSchema = new Schema({
    item_id: {
        type: Number,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
})

export const Comments = model('comments', CommentSchema)