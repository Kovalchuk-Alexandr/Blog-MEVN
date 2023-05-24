<!-- Компонент, который будет описывать шапку сайта -->
<template>
    <div class="header">
        <span class="logo">{{ title }}</span>
        <button @click="addRating"> + </button>
        <span class="user">{{ fullName }} ({{ user.rating }})</span>
    </div>
    <!-- <h1>{{ title }}</h1> -->
</template>

<script>
export default {
    // Название компонента
    name: 'Header',
    // Внутри data() можно создать разные переменные (свойства)
    // с которыми можем работать внутри HTML
    data() {
        return {
            user: {
                name: 'John',
                surname: 'Doe',
                age: 26,
                rating: 0,
                email: 'john@doe.com'
            },
            allRating: 0
        };
    },
    computed: {
        fullName() {
            return ` Wellcome, ${this.user.name} ${this.user.surname}`
        }
    },

    methods: {
        addRating() {
            this.user.rating++;
            this.allRating++;
        },
    },

    // Отслеживаем переменную allRating
    // для этого в watch: создаем ф. allRating()
    // newValue - новое значение в переменной
    // oldValue - предыдущее значение
    watch: {
        allRating(newValue, oldValue) {
            if (newValue > 5) 
                alert(`New Value: ${newValue}; Old Value: ${oldValue}`)
                // console.log(`${newValue}`)
        }
    },

    // При перезагрузке страницы устанавливаем счетчик (рейтинг) 1
    mounted() {this.addRating()},

    props: {
        // указываем свойства для передаваемого параметра:
        // type: String (Number), - тип - строка
        // required: true (false) - обязательное или нет
        title: {
            type: String,
            required: true
        },
    },
};
</script>

<!--  scoped - говорит, что эти стили являются дочерними  
lang="css" - стандартный 'CSS'
lang="sass" - препроцессор 'SASS' (установка: npm install sass)
-->

<style lang="css" scoped>
.header {
    background: #333;
    color: #fff;
    padding: 20px;
    border-bottom: 2px solid black;
}

.header .logo {
    font-size: 20px;
}

.header .user {
    float: right;
    font-size: 20px;
}

.header button {
    float: right;
    background: rgb(223, 51, 51);
    color: #fff;
    border-radius: 5px;
    padding: 5px 7px;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 15px;
    position: relative;
    top: -4px;
}

</style>