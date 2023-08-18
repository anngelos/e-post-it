<script>
import draggable from 'vuedraggable';

export default {
  components: { draggable },
  data() {
    return {
      posts: [],
      newPost: {},
      showModal: false,
      editedPost: {
        title: null,
        text: null,
        index: -1,
      },
    };
  },
  methods: {
    addNewPost() {
      if (!this.newPost.title || !this.newPost.text) {
        alert("Para adicionar um novo post o título ou texto não pode estar vazio!");
      } else {
        this.newPost.id = Math.floor(Math.random() * 100) + 1;
        this.posts.push(this.newPost);
        this.newPost = {};
        localStorage.setItem("posts", JSON.stringify(this.posts));
      }
    },
    removePost(index) {
      this.posts.splice(index, 1);
    },
    openEditModal(index) {
      this.editedPost = { ...this.posts[index], index };
      this.showModal = !this.showModal;
    },
    saveChanges() {
      if (!this.editedPost.title || !this.editedPost.text) {
        alert("Para editar um post-it o título ou texto não pode estar vazio!");
      } else {
        const { index, title, text } = this.editedPost;
        this.posts[index].title = title;
        this.posts[index].text = text;
        this.showModal = !this.showModal;
      }

    },
    copyText() {
      const card = event.target.closest("#card");
      const textToCopy = card.querySelector("p").innerText;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          alert('Texto copiado para o clipboard.')
        })
        .catch((err) => {
          console.error("Erro ao copiar texto:", err);
        });
    },
    toggleModal() {
      this.showModal = !this.showModal;
    },
    getPostKey(post) {
      return post.id;
    },
    storePosts() {
      localStorage.setItem("posts", JSON.stringify(this.posts));
    },
    onDragEnd() {
      // Atualize o array cardList com a nova ordem após o arrasto
      // Isso é apenas um exemplo simples, você pode precisar adaptá-lo à sua lógica
      this.posts = [...this.posts];
      this.storePosts()
    },
  },
  created() {
    this.posts = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem("posts")) : this.posts;
  },
};
</script>

<template>
  <div class="flex flex-wrap justify-center m-2 add-input-container">
    <input class="border border-gray-700 rounded-md m-2 pl-2" type="text" v-model="newPost.title" placeholder="título" />
    <input class="border border-gray-700 rounded-md m-2 pl-2" type="<textarea" v-model="newPost.text"
      placeholder="texto" />
    <button @click="addNewPost(); storePosts()"
      class="m-2 py-2 px-4 capitalize tracking-wide bg-gray-700 text-white font-medium rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700">
      Adicionar
    </button>
  </div>

  <div v-if="!posts.length" class="flex flex-wrap justify-center mt-16 no-post-container">
    <p class="text-xl font-medium leading-tight text-black dark:text-neutral-50">
      NENHUM POST A SER MOSTRADO NO MOMENTO...
    </p>
  </div>

  <div v-if="showModal"
    class="main-modal fixed w-full h-100 inset-0 z-50 overflow-hidden flex justify-center items-center animated fadeIn faster"
    style="background: rgba(0, 0, 0, 0.7)">
    <div
      class="border border-gray-900 shadow-lg modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div class="modal-content py-4 text-left px-6">
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Editar Post</p>
          <div @click="toggleModal()" class="modal-close cursor-pointer z-50">
            <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
              viewBox="0 0 18 18">
              <path
                d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z">
              </path>
            </svg>
          </div>
        </div>
        <div class="my-5 flex flex-col space-y-4">
          <input v-model="editedPost.title" class="border border-gray-700 rounded-md m-2 pl-2" type="text"
            placeholder="titulo" />
          <input v-model="editedPost.text" class="border border-gray-700 rounded-md m-2 pl-2" type="text"
            placeholder="texto" />
        </div>
        <div class="flex justify-end pt-2">
          <button @click="toggleModal()"
            class="focus:outline-none modal-close px-4 border border-black p-3 rounded-lg text-black hover:bg-gray-400">
            Cancelar
          </button>
          <button @click="saveChanges(); storePosts()"
            class="focus:outline-none px-4 bg-gray-700 p-3 ml-3 rounded-lg text-white hover:bg-gray-600">
            Salvar
          </button>
        </div>
      </div>
    </div>
  </div>

  <draggable v-model="posts" @end="onDragEnd" :itemKey="getPostKey" drag-class="draggin" ghost-class="ghost-drag"
    class="flex flex-wrap justify-center container-cards">
    <template #item="{ element: post, index }">
      <div :key="post.id" id="card"
        class="m-7 block max-w-[18rem] rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-600">
        <div
          class="flex justify-center border-b-2 border-[#0000002d] px-6 py-2 text-neutral-600 dark:text-neutral-50 post-id">
          #{{ post.id }}
        </div>
        <div class="p-6">
          <h5 class="mb-2 text-xl font-medium leading-tight text-black dark:text-neutral-50 post-title">
            {{ post.title }}
          </h5>
          <p class="text-base text-black dark:text-neutral-50 post-text">
            {{ post.text }}
          </p>
          <div class="mt-3">
            <button @click="openEditModal(index)"
              class="mr-3 inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path
                  d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path fill-rule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
              </svg>
            </button>
            <button @click="removePost(index); storePosts()"
              class="mr-3 inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg"
                viewBox="0 0 16 16">
                <path
                  d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
              </svg>
            </button>

            <button @click="copyText()"
              class="mr-3 inline-flex items-center justify-center w-8 h-8 transition-colors duration-150 rounded-full focus:shadow-outline icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clipboard2"
                viewBox="0 0 16 16">
                <path
                  d="M3.5 2a.5.5 0 0 0-.5.5v12a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-12a.5.5 0 0 0-.5-.5H12a.5.5 0 0 1 0-1h.5A1.5 1.5 0 0 1 14 2.5v12a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-12A1.5 1.5 0 0 1 3.5 1H4a.5.5 0 0 1 0 1h-.5Z" />
                <path
                  d="M10 .5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5.5.5 0 0 1-.5.5.5.5 0 0 0-.5.5V2a.5.5 0 0 0 .5.5h5A.5.5 0 0 0 11 2v-.5a.5.5 0 0 0-.5-.5.5.5 0 0 1-.5-.5Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </template>
  </draggable>
</template>

<style>
.active {
  background-color: white;
  border: 1px solid black;
  color: black;
}

.draggin {
  background-color: #374151;
}

.draggin .post-id {
  color: white;
}

.draggin .post-title {
  color: white;
}

.draggin .post-text {
  color: white;
}

.ghost-drag {
  visibility: hidden;
}

.icon:hover {
  -xpedu-transform: scale(1.3);
  -ms-transform: scale(1.3);
  transform: scale(1.3);
}
</style>
