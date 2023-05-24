"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const blogrouter_1 = require("./router/blogrouter");
try {
    (0, mongoose_1.connect)(config_1.MONGO);
    console.log('DB Connection successed!');
}
catch (err) {
    console.log(err);
}
// Application, Request, Response -импортируем возможность
// добавлять типы данных
const app = (0, express_1.default)();
// Подключаем промежуточные обработчики
app.use(express_1.default.urlencoded({ extended: false }));
// Ссылки, которые будут начинаться '/api/blog-item' будут обрабатываться BlogRouter
app.use('/api/blog-item', blogrouter_1.BlogRouter);
// Отслеживаем главную страницу
app.get('/', (request, response) => {
    response.send('Hello');
});
// Запускаем сервер
app.listen(config_1.PORT, () => console.log('Server started!!!'));
