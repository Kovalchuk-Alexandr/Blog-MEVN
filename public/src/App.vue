<template>
  <div
    class="btnBack"
    v-if="!isVisible"
    @click="this.isVisible = !this.isVisible"
  >
    {{ msgBtnAdd }}
  </div>
  <main class="items" v-if="isVisible">
    <!-- <div v-if="isVisible"> -->
    <div class="item" v-for="el in items" :key="el.id">
      <img v-bind:src="el.img" alt="" />
      <h4>{{ el.title }}</h4>
      <p>{{ el.anons }}</p>
      <p>{{ el.published }}</p>
      <!-- @click="this.isVisible = !this.isVisible" -->
      <button @click="showDetailes(el.id)" type="button" class="btnDetails">
        Details
      </button>
    </div>
    <!-- </div> -->
  </main>
  <Item1 v-bind:id="this.id" v-if="!isVisible" />
</template>

<!-- ---------- vue - приложение -------------- -->
<script>
import axios from "axios";
import Item1 from "./components/Item1.vue";

export default {
  name: "App",
  components: {
    Item1,
  },
  data() {
    return {
      items: [],
      id: 0,
      isVisible: true,
      msgBtnAdd: "Back to list",
      el: {},
      i: 0,
    };
  },

  // Во vue.config.js сказали, что вместо 'api/'
  // подставляем 'http://localhost:3000'
  // переходим на главную страницу нашего api-приложения
  async mounted() {
    const result = await axios.get("/api/blog-item");
    this.items = result.data;
    console.log(this.items);
  },
  methods: {
    // Удаление записей
    async deleteItem(el, i) {
      await axios.delete("/api/blog-item/" + el._id);
      // обращаемся к массиву и обрезаем, начиная с индекса 'i' - один элемент
      this.items.splice(i, 1);
      // Удаление элемента
      // deletePost(id) {
      // добавляем в новый массив все, кроме помеченного на удаление
      // this.articles = this.articles.filter((el) => el.id != id);
      // },
    },
    // Добавление записей
    async addItem() {
      let date = Date.now();
      let url = `/api/blog-item/?title=${this.title}&user=${this.user}&published=${date}`;

      if (this.isNew) {
        await axios.post(url);
        // Отображаем запись
        this.items.push({
          title: this.title,
          user: this.user,
          published: date,
        });
      } else {
        // await axios.put(url + this.id);
        await axios.post(url);

        this.el.title = this.title;
        this.el.user = this.user;
        this.el.published = date;

        this.msgBtnAdd = "Add Item";
      }
      // Очищаем переменные title, user - и значения внутри input-полей
      this.title = "";
      this.user = "";
    },
    // Обновление записей
    async editItem(el, i) {
      // let date = Date.now();
      this.el = el;
      this.i = i;
      this.id = el._id;
      this.isNew = false;
      console.log("isNew after: " + this.isNew);
      console.log("msgBtnAdd: " + this.msgBtnAdd);

      this.msgBtnAdd = "Update";
      console.log("msgBtnAdd: " + this.msgBtnAdd);
      console.log("this.el: ");
      console.log(this.el);
      console.log("this.i: " + this.i);
      console.log("this.id: " + this.id);
      // btnAdd.innerHTML = "Update";
      // let url = `/api/todo-item/?title=${this.title}&user=${this.user}&published=${date}`;
      //  await axios.post(url);
      // Отображаем запись
      // this.items.push({
      //   title: this.title,
      //   user: this.user,
      //   published: date,
      // });
      // console.log(`el: ${el}, i: ${i}`);
      // `title: (!(${title}) == '' ? ${title}: '') , this.title: ${this.title}`
      console.log(`el: ${el}`);
      console.log(`title: ${el.title}`);
      console.log(`user: ${el.user}`);
      console.log(`published: ${el.published}`);

      this.title = el.title;
      this.user = el.user;
    },
    showDetailes(id) {
      this.isVisible = !this.isVisible;
      this.id = id;
      console.log(this.id);
    },
  },
};
</script>

<style>
.item button {
  width: 60%;
  margin-left: 20%;
  margin-bottom: 20px;
  border-radius: 4px;
  text-align: center;
  font-size: 16px;
  background: #a52323;
  border: 2px solid coral;
  color: cornsilk;
  cursor: pointer;
  transition: all 500ms ease;
}

div .btnBack {
  /* margin-top: 20px; */
  /* width: 40%; */
  position: relative;
  top: 20px;
  left: 5%;
  margin-bottom: 20px;
  /* height: 40px;*/
  width: 150px;
  padding: 10px 20px;
  border-radius: 25px;
  /* line-height: 50px; */
  text-align: center;
  font-size: 16px;
  background: #a52323;
  border: 2px solid coral;
  color: cornsilk;
  cursor: pointer;
  transition: transform 500ms ease;
}

.item button:hover,
div .btnBack:hover {
  cursor: pointer;
  background: #cc1f1f;
  transform: scale(1.05);
}
</style>
