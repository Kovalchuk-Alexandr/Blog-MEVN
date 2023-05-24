<template>
  <!-- form @submit.prevent - выполняет ф. кнопки submit,
        (обрабатываем здесь), но предотвращает стандартное поведение (перезагрузку) 
        :class - говорим, что внутрь класса можно помещать переменные и с ними взаимодействовать
        {error: maxCharacters > 20} - будем добавлять класс error, когда maxCharacters > 20 -->
  <form @submit.prevent="createPost" :class="{ error: maxCharacters > 20 }">
    <label for="title">Title of article</label>
    <!-- v-model - говорим, в какую переменную будем
                помещать введенные данные -->
    <input
      v-model="state.userTitleInput"
      type="text"
      id="title"
      placeholder="Input title"
    />
    <label for="text"
      >Main text: <span>{{ maxCharacters }} / 20</span></label
    >
    <textarea
      v-model="state.userTextInput"
      id="title"
      placeholder="Enter a text"
    ></textarea>
    <button>Add</button>
  </form>
</template>

<script>
import { reactive, computed } from "vue";

export default {
  name: "AddPost",

  // Здесь прописываем разные свойства, методы, переменные
  setup(props, ctx) {
    // здесь переменные назыаваются "состояния (state)"
    const state = reactive({
      userTitleInput: "",
      userTextInput: "",
    });

    // Переписываем computed()
    const maxCharacters = computed(() => state.userTextInput.length);

    // Переписываем metods: createPost()
    const createPost = () => {
      if (state.userTitleInput !== "" && state.userTextInput !== "") {
        ctx.emit("add-post", state.userTitleInput, state.userTextInput);
        // после ввода, очищаем поля
        state.userTitleInput = "";
        state.userTextInput = "";
      }
    };

    return {
      state,
      maxCharacters,
      createPost,
    };
  },

  // data() {
  //   return {
  //     userTitleInput: "",
  //     userTextInput: "",
  //   };
  // },
  // methods: {
  //   createPost() {
  //     if (this.userTitleInput !== "" && this.userTextInput !== "") {
  //       this.$emit("add-post", this.userTitleInput, this.userTextInput);
  //       // после ввода, очищаем поля
  //       this.userTitleInput = "";
  //       this.userTextInput = "";
  //     }
  //   },
  // },
  // computed: {
  //   // max число введенных символов - 20
  //   maxCharacters() {
  //     return this.userTextInput.length;
  //   },
  // },
};
</script>

<style scoped>
/* aside form label { color: darkslategray;} */

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
  float: right;
  width: 70px;
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

form button:hover {
  margin-top: 2px;
  border-bottom-width: 2px;
  background: #f86f3e;
}
</style>
