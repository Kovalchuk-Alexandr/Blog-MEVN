import express, { Application, Request, Response } from 'express'
import { connect } from 'mongoose'
import { MONGO, PORT } from './config'
import { BlogRouter } from './router/blogrouter'

try{
    connect(MONGO)
    console.log('DB Connection successed!')
} catch (err) {
    console.log(err)
}

// Application, Request, Response -импортируем возможность
// добавлять типы данных
const app: Application = express()

// Подключаем промежуточные обработчики
app.use(express.urlencoded({ extended: false }))
// Ссылки, которые будут начинаться '/api/blog-item' будут обрабатываться BlogRouter
app.use('/api/blog-item', BlogRouter)

// Отслеживаем главную страницу
app.get('/', (request: Request, response: Response) => {
    response.send('Hello')
})

// Запускаем сервер
app.listen(PORT, () => console.log('Server started!!!'))