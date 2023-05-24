"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRouter = void 0;
// Файл, отвечающий за URL - адреса
const express_1 = require("express");
const blog_items_1 = require("../models/blog-items");
const comments_1 = require("../models/comments");
const router = (0, express_1.Router)();
// 'POST' - сохранение
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).send('Ok')
    // Пробуем сохранить полученные данные. Если не получается - выбрасываем ошибку
    try {
        // Создаем новую коллекцию, на основании описания Items
        // в blog-items.ts из данных, которые получим из формы
        const NewBlogListItem = new blog_items_1.Items(req.query); //Items(req.body)
        // Сохраняем запись в БД (await - ожидаем отработки ф.)
        // чтобы 'await' сработал, вызывающая ф. должна быть асинхронной (async) см. выше
        const result = yield NewBlogListItem.save();
        if (!result)
            throw new Error('Impossible to save data!');
        res.status(200).send('Ok!!!'); // Действие корректно обрабоно
    }
    catch (err) {
        console.log(err);
        res.status(500); // Сервер ответил ошибкой
    }
}));
// 'GET' обработка URL, за счет которого будем выводить все записи коллекции
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const getItems = yield blog_items_1.Items.find().sort({ published: -1 });
        if (!getItems)
            throw new Error('No items!!!');
        // если нет ошибки, возвращаем все найденные элементы
        res.status(200).send(getItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err); // Сервер ответил ошибкой
    }
}));
// Обработка страницы товара
router.get('/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // {id: request.params.id} - находим статью у которой 'id'
        // совпадает с 'id', переданным в URL
        const getItem = yield blog_items_1.Items.findOne({ id: request.params.id });
        if (!getItem)
            throw new Error('Items not found!');
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItem);
    }
    catch (err) {
        console.log(err);
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err);
    }
}));
// Обновление данных
// получаем 'id' записи
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const result = yield blog_items_1.Items.updateOne({ "_id": req.params.id }, { $set: req.query });
        if (!result)
            throw new Error('No items!!!');
        // если нет ошибки, возвращаем все найденные элементы
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err); // Сервер ответил ошибкой
    }
}));
// Удаление данных
// получаем 'id' записи
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const result = yield blog_items_1.Items.deleteOne({ "_id": req.params.id });
        if (!result)
            throw new Error('No items!!!');
        // если нет ошибки, возвращаем все найденные элементы
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err); // Сервер ответил ошибкой
    }
}));
// ------------ Блок работы с коллекцией 'Comments' ----------
// 'POST' - сохранение
router.post('/msg/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).send('Ok')
    // Пробуем сохранить полученные данные. Если не получается - выбрасываем ошибку
    try {
        // Создаем новую коллекцию, на основании описания Items
        // в blog-items.ts из данных, которые получим из формы
        const NewCommentsListItem = new comments_1.Comments(req.query); //Items(req.body)
        // Сохраняем запись в БД (await - ожидаем отработки ф.)
        // чтобы 'await' сработал, вызывающая ф. должна быть асинхронной (async) см. выше
        const result = yield NewCommentsListItem.save();
        if (!result)
            throw new Error('Impossible to save data!');
        res.status(200).send('Ok!!!'); // Действие корректно обрабоно
    }
    catch (err) {
        console.log(err);
        res.status(500); // Сервер ответил ошибкой
    }
}));
// Получение комментариев для одного 'id'
router.get('/msg/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // {id: request.params.id} - находим статью у которой 'id'
        // совпадает с 'id', переданным в URL
        const getItems = yield comments_1.Comments.find({ item_id: request.params.id });
        if (!getItems)
            throw new Error('Items not found!');
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItems);
    }
    catch (err) {
        console.log(err);
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err);
    }
}));
// Удаление данных
// получаем 'id' записи
router.delete('/msg/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const result = yield comments_1.Comments.deleteOne({ "_id": req.params.id });
        if (!result)
            throw new Error('No items!!!');
        // если нет ошибки, возвращаем все найденные элементы
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err); // Сервер ответил ошибкой
    }
}));
exports.BlogRouter = router;
