<template>
  <main>
    <div v-if="articles.length > 0" id="articles">
      <div class="post" v-for="el in articles" :key="el.id">
        <button @click="deletePost(el.id)">Delete</button>
        <h2>{{ el.title }}</h2>
        <p>{{ el.text }}</p>
      </div>
    </div>
    <h2 class="empty" v-else>
      <center>There is no any articles left!</center>
    </h2>
  </main>
  <!-- -----------Формочка -------------------- -->
  <aside>
    <AddPost v-on:add-post="createPost" />
  </aside>
</template>

<script>
import AddPost from "./AddPost composition.vue";
export default {
  name: "Articles",
  components: { AddPost },
  data() {
    return {
      // userTitleInput: "",
      // userTextInput: "",
      articles: [
        {
          id: 1,
          title: "Google buy Apple",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, pariatur?",
        },
        {
          id: 2,
          title: "Microsoft kills Minecaft",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, pariatur?",
        },
        {
          id: 3,
          title: "Testing article",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, pariatur?",
        },
        {
          id: 4,
          title: "Tesla is now phone company",
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, pariatur?",
        },
      ],
    };
  },
  methods: {
    // Удаление элемента
    deletePost(id) {
      // добавляем в новый массив все, кроме помеченного ну удаление
      this.articles = this.articles.filter((el) => el.id != id);
    },
    createPost(userTitleInput, userTextInput) {
      // if (this.userTitleInput !== "" && this.userTextInput !== "") {
      this.articles.unshift({
        // id: Math.random() * 1000 - генерим случайный id
        id: this.articles.length + 1,
        title: userTitleInput,
        text: userTextInput,
      });
      // после ввода, очищаем поля
      // this.userTitleInput = '';
      // this.userTextInput = '';
      // }
    },
  },
  // computed: {
  //     // max число введенных символов - 20
  //     maxCharacters() {
  //         return this.userTextInput.length;
  //     }
  // }
};
</script>

<style scoped>
/* ---------- Основной блок ------------------ */
main {
  float: left;
  width: 60%;
}

/* ---------- Блок статей ------------------ */
#articles {
  margin: 20px;
}

#articles .post {
  background: bisque;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid burlywood;
  float: left;
  width: 100%;
}

#articles .post button {
  float: right;
  background: #f05a23;
  border: 2px solid burlywood;
  border-radius: 8px;
  border-bottom-width: 4px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: bold;
  color: blanchedalmond;
  cursor: pointer;
  transition: all 100ms ease;
}

#articles .post button:hover {
  margin-top: 2px;
  border-bottom-width: 2px;
  background: #f86f3e;
}

.empty {
  margin: 20px;
  color: #e60101;
}

/* ---------- Блок формы ------------------ */
aside {
  float: left;
  width: 25%;
  margin-left: 8%;
  margin-top: 20px;
}
</style>
