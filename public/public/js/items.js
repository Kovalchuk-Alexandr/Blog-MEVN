// Чтобы добавить сразу все элементы в БД:
// const items = 
const BlogItems = new Schema({
    id: { type: Number, required: true},
    title: { type: String,required: true},
    anons: {type: String,required: true},
    full_text: {type: String,required: true},
    img: { type: String, required: true },
    published: {type: Date,require: false,default: Date.now()
    }
})
db.articles.insertMany([
    {
        id: 0,
        title: 'Какая зарплата у разработчика SQL?',
        anons: 'Последние несколько лет в разработке все больше популяризируют данные и их правильное хранение. Многие даже считают информацию новой нефтью. А все что происходит вокруг – подтверждает высказывание.#прогер',
        full_text: 'https://itproger.com/news/kakaya-zarplata-u-razrabotchika-sql',
        img: '1683961859.jpg',
        published: '2023/05/14'
    },
    {
        id: 1,
        title: 'Способен ли Kotlin заменить Java в разработке для Android?',
        anons: 'Зачастую, Андроид разработка ведется на языке Джава. В то же время, язык уже устарел и в спину ему уже дышит молодой язык Kotlin. Кто же из них станет главным языком для разработки Андроид программ?',
        full_text: 'https://itproger.com/news/sposoben-li-kotlin-zamenit-java-v-razrabotke-dlya-android',
        img: '1683306413.jpg',
        published: '2023/05/12'
    },
    {
        id: 2,
        title: 'Почему стоит освоить С#?',
        anons: 'Язык программирования C# постепенно набирает все большую популярность, а разработчики, работающие с ним получают круглые суммы. Это уже является неплохим подспорьем для того, чтобы начать изучать C#.',
        full_text: 'https://itproger.com/news/pochemu-stoit-osvoit-s',
        img: '1681974714.jpg',
        published: '2023/04/23'
    },
    {
        id: 3,
        title: 'Лучшие JS-библиотеки для работы',
        anons: 'JavaScript уже долгое время входит в ТОП-10 самых популярных языков программирования в мире. Он имеет огромное количество библиотек и фреймворков. Все они направлены на помощь разработчикам.',
        full_text: 'https://itproger.com/news/pochemu-stoit-osvoit-s',
        img: '1680541818.jpg',
        published: '2023/04/07'
    }
])