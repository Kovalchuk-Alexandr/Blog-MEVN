"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Items = void 0;
// За счет Schema описываем коллекцию, которая будет создана
const mongoose_1 = require("mongoose");
const BlogItems = new mongoose_1.Schema({
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
});
// Эспортируем модель 'items', с описанием в 'BlogItems' 
exports.Items = (0, mongoose_1.model)('articles', BlogItems);
