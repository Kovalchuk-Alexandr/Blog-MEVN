<template>
  <!-- <div>ID: {{ id }}</div> -->
  <main class="items">
    <!-- ---------- Блок статьи ------------ --->
    <!-- <div class="item" v-for="el in items" :key="el.id"> -->
    <div>
      <img v-bind:src="this.items.img" alt="" />
      <h4>{{ this.items.title }}</h4>
      <p>{{ this.items.anons }}</p>
      <!-- <p>{{ this.items.full_text }}</p> -->
      <div id="fulltext">
        <!-- {{ this.items.full_text }} -->
      </div>
      <!-- ----------  Блок полной статьи --------- -->

      <p>{{ this.items.published }}</p>
      <!-- <button type="button" class="btnDetails">Details</button> -->
    </div>
  </main>
  <section class="comments">
    <div>
      <h2>Leave some comments</h2>
      <form @submit.prevent="addMsg" :class="{ error: maxCharacters > 100 }">
        <!-- <form> -->
        <input
          type="text"
          v-model="userInput"
          placeholder="Enter You Name"
          id="user"
        /><br />
        <label for="msg"
          >Max text: <span>{{ maxCharacters }} / 100</span></label
        >
        <textarea
          v-model="msgInput"
          placeholder="Enter some message"
          id="msg"
        />
        <button type="button" class="btnAdd" @click="addMsg">
          {{ msgBtnAdd }}
        </button>
      </form>
    </div>

    <div v-if="comments.length > 0" id="articles">
      <!-- Перебираем массив, получаем эл-т, индекс и выводим каждый элемент -->
      <h2>
        Comments ( <span>{{ comments.length }}</span> )
      </h2>
      <div class="list-item" v-for="el in comments" :key="el.id">
        <button @click="deletePost(el)">Delete</button>
        <!-- <p>
          {{ el.message }} <span>{{ el.user }}</span>
        </p> -->
        <h4>{{ el.user }}</h4>
        <p>{{ el.message }}</p>
      </div>
    </div>
    <h2 v-else class="empty">
      <center>There is no any articles!</center>
    </h2>
  </section>
</template>

<!-- ---------- vue - приложение -------------- -->
<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      items: [],
      comments: [],
      comm: [],
      userInput: "",
      msgInput: "",
      msgBtnAdd: "Add Item",
    };
  },

  // Во vue.config.js сказали, что вместо 'api/'
  // подставляем 'http://localhost:3000'
  // переходим на главную страницу нашего api-приложения
  async mounted() {
    const result = await axios.get("/api/blog-item/" + this.id);
    this.items = result.data;

    const res = await axios.get("/api/blog-item/msg/" + this.id);
    this.comments = res.data;
    // console.log(this.id);
    // console.log(this.items);
    // console.log(this.comments);
    // console.log(this.items.full_text);

    const fullTextBlock = document.querySelector("#fulltext");
    fullTextBlock.innerHTML = this.items.full_text;
  },
  methods: {
    // Удаление записей
    async deletePost(el) {
      await axios.delete("/api/blog-item/msg/" + el._id);
      // обращаемся к массиву и обрезаем, начиная с индекса 'i' - один элемент
      // this.comments.splice(i, 1);
      // console.log(`element: ${el}, id: ${i}`);
      this.comments = this.comments.filter((item) => item._id != el._id);
      // console.log(el);
      // console.log(el._id);
      // console.log(this.comm);
    },
    // Добавление записей
    async addMsg() {
      //let date = Date.now();
      let url = `/api/blog-item/msg/?user=${this.userInput}&message=${this.msgInput}&item_id=${this.id}`;
      if (this.userInput !== "" && this.msgInput !== "") {
        await axios.post(url);
        // updateComments();
        this.comments.push({
          item_id: this.id,
          user: this.userInput,
          message: this.msgInput,
        });
        // после ввода, очищаем поля
        this.userInput = "";
        this.msgInput = "";
      }
      this.msgBtnAdd = "Add Item";
    },
  },
  props: ["id"],
  computed: {
    // max число введенных символов - 20
    maxCharacters() {
      return this.msgInput.length;
    },
  },
};
</script>

<style scoped>
/* ---------------- Main ---------------- */
main,
.comments {
  width: 90%;
  padding: 20px 5%;
  margin-bottom: 40px;
  line-height: 22px;
}

main h4,
#fulltext h2 {
  font-weight: 600;
  font-size: 26px;
  margin-top: 10px;
  margin-bottom: 5px;
  text-align: center;
  color: #c20909;
}

main p,
#fulltext p {
  margin-top: 10px;
  margin-bottom: 5px;
  /* color: #c20909; */
}

.item button {
  width: 60%;
  margin-left: 20%;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  /* Выравниваем по центру (по вертикали), указываем line-height = height*/
  /* line-height: 70px; */
  /* background: #e79e6d; */
  background: #a52323;
  border: 2px solid coral;
  color: cornsilk;
  cursor: pointer;
  transition: all 500ms ease;
}

.item button:hover {
  cursor: pointer;
  background: #cc1f1f;
  /* background: #e43f3f; */
}

/* ---------------- Forms ---------------- */
.list-item {
  width: 100%;
  background: #f1d1a1; /*aquamarine; #fcddaf; #dfbc4c*/
  padding: 10px 15px;
  margin-top: 10px;
  border: 1px solid silver;
  border-radius: 5px;
  font-size: 14px;
}

.list-item p {
  margin-bottom: 8px;
}

.list-item p span {
  float: right;
  font-size: 12px;
  color: #8f772d;
}

.list-item p:last-child {
  color: #b1953c;
  font-size: 11px;
}

.list-item button {
  /* display: block; */
  float: right;
  border: 0;
  border-radius: 5px;
  padding: 4px 8px;
  margin: 0;
  margin-left: 10px;
  background: #d15a2a;
  color: #fddaae;
  cursor: pointer;
  font-size: 12px;
  transition: transform 300ms ease;
}

/* ---------- Блок формы ------------------ */
form input,
form textarea {
  width: 100%;
  background: bisque;
  border-radius: 5px;
  border: 2px solid burlywood;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  margin-bottom: 20px;
  margin-top: 3px;
  resize: none;
}

form textarea {
  height: 90px;
}

form label {
  font-weight: bold;
}

form.error label {
  color: #cf341ff1;
}

form button {
  /* float: right; */
  display: block;
  /* width: 70px; */
  background: #d15a2a; /*#f05a23;*/
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

form button:hover {
  margin-top: 2px;
  border-bottom-width: 2px;
  background: #f86f3e;
}
.btnEdit {
  background: #348531;
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
/* .list-item button:hover {
  transform: scale(1.1);
} */
</style>
