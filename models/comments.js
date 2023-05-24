"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comments = void 0;
const mongoose_1 = require("mongoose");
// описываем корзину купленных товаров: 'id' + количество
const CommentSchema = new mongoose_1.Schema({
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
});
exports.Comments = (0, mongoose_1.model)('comments', CommentSchema);
