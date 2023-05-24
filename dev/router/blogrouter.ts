// Файл, отвечающий за URL - адреса
import { Router } from "express";
import { Items } from '../models/blog-items'
import { Comments } from "../models/comments";

const router = Router()

// 'POST' - сохранение
router.post('/', async (req, res) => {
    // res.status(200).send('Ok')
    // Пробуем сохранить полученные данные. Если не получается - выбрасываем ошибку
    try {
        // Создаем новую коллекцию, на основании описания Items
        // в blog-items.ts из данных, которые получим из формы
        const NewBlogListItem = new Items(req.query)  //Items(req.body)

        // Сохраняем запись в БД (await - ожидаем отработки ф.)
        // чтобы 'await' сработал, вызывающая ф. должна быть асинхронной (async) см. выше
        const result = await NewBlogListItem.save()

        if (!result) throw new Error('Impossible to save data!')

        res.status(200).send('Ok!!!')     // Действие корректно обрабоно
    } catch (err) {
        console.log(err)
        res.status(500) // Сервер ответил ошибкой
    }
})

// 'GET' обработка URL, за счет которого будем выводить все записи коллекции
router.get('/', async (req, res) => {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const getItems = await Items.find().sort({ published: -1 })
        if (!getItems) throw new Error('No items!!!')
            // если нет ошибки, возвращаем все найденные элементы
            res.status(200).send(getItems)
    } catch (err) {
        console.log(err)
        res.status(500).send(err) // Сервер ответил ошибкой
    }
})

// Обработка страницы товара
router.get('/:id', async (request, response) => {
    try {
        // {id: request.params.id} - находим статью у которой 'id'
        // совпадает с 'id', переданным в URL
        const getItem = await Items.findOne({id: request.params.id})
        if (!getItem) throw new Error('Items not found!')
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItem)
    } catch (err) {
        console.log(err)
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err)
       }
})

// Обновление данных
// получаем 'id' записи
router.put('/:id', async (req, res) => {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const result = await Items.updateOne({"_id": req.params.id}, {$set: req.query})
        if (!result) throw new Error('No items!!!')
            // если нет ошибки, возвращаем все найденные элементы
            res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err) // Сервер ответил ошибкой
    }
})

// Удаление данных
// получаем 'id' записи
router.delete('/:id', async (req, res) => {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const result = await Items.deleteOne({"_id": req.params.id})
        if (!result) throw new Error('No items!!!')
            // если нет ошибки, возвращаем все найденные элементы
            res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err) // Сервер ответил ошибкой
    }
})

// ------------ Блок работы с коллекцией 'Comments' ----------
// 'POST' - сохранение
router.post('/msg/', async (req, res) => {
    // res.status(200).send('Ok')
    // Пробуем сохранить полученные данные. Если не получается - выбрасываем ошибку
    try {
        // Создаем новую коллекцию, на основании описания Items
        // в blog-items.ts из данных, которые получим из формы
        const NewCommentsListItem = new Comments(req.query)  //Items(req.body)

        // Сохраняем запись в БД (await - ожидаем отработки ф.)
        // чтобы 'await' сработал, вызывающая ф. должна быть асинхронной (async) см. выше
        const result = await NewCommentsListItem.save()

        if (!result) throw new Error('Impossible to save data!')

        res.status(200).send('Ok!!!')     // Действие корректно обрабоно
    } catch (err) {
        console.log(err)
        res.status(500) // Сервер ответил ошибкой
    }
})

// Получение комментариев для одного 'id'
router.get('/msg/:id', async (request, response) => {
    try {
        // {id: request.params.id} - находим статью у которой 'id'
        // совпадает с 'id', переданным в URL
        const getItems = await Comments.find({item_id: request.params.id})
        if (!getItems) throw new Error('Items not found!')
        // Если все хорошо,, отправляем пользователю все элементы
        response.status(200).send(getItems)
    } catch (err) {
        console.log(err)
        // Если сервер не смог обработать, отправляем пользоавтелю ошибку
        response.status(500).send(err)
       }
})

// Удаление данных
// получаем 'id' записи
router.delete('/msg/:id', async (req, res) => {
    try {
        //  Items.find({"user": "admin"}) - вариант с условием вывода
        // Items.find() - вывод всех записей
        const result = await Comments.deleteOne({"_id": req.params.id})
        if (!result) throw new Error('No items!!!')
            // если нет ошибки, возвращаем все найденные элементы
            res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send(err) // Сервер ответил ошибкой
    }
})


export const BlogRouter = router