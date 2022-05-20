new Vue({
  el: '#app',
  data() {
    return {
      todoList: [
        { "id": 0, "title": "Visit the Souks of Marrakech", "done": false },
        { "id": 1, "title": "See the Blue Village of Chefchaouen", "done": false },
        { "id": 2, "title": "See the medina in Fez", "done": true }
      ],
      new_todo: '',
      showComplete: false,
    };
  },
  mounted() {
    this.getTodos()
  },
  watch: {
    todoList: {
      handler(updatedList) {
        localStorage.setItem('todo_list', JSON.stringify(updatedList));
      },
      deep: true
    }
  },
  computed: {
    pending() {
      return this.todoList.filter(item => !item.done)
    },
    completed() {
      return this.todoList.filter(item => item.done);
    },
    completedPercentage() {
      return (Math.floor((this.completed.length / this.todoList.length) * 100)) + "%";
    }
  },
  methods: {
    // get all todos when loading the page
    getTodos() {
      if (localStorage.getItem('todo_list')) {
        this.todoList = JSON.parse(localStorage.getItem('todo_list'));
      }
    },
    // add a new item
    addItem() {
      // validation check
      if (this.new_todo) {
        this.todoList.unshift({
          id: this.lastId() + 1,
          title: this.new_todo,
          done: false,
        });
      }
      // reset new_todo
      this.new_todo = '';
      // save the new item in localstorage
      return true;
    },
    lastId() {
      idList = this.todoList.map(item => item.id)
      return Math.max(...idList)
    },
    deleteItem(item) {
      this.todoList.splice(this.todoList.indexOf(item), 1);
      lastId = this.lId()
    },
    toggleShowComplete() {
      this.showComplete = !this.showComplete;
    },
    clearAll() {
      this.todoList = [];
    }
  },
});