<template>
  <div class="sub-container">
    <h1 class="title">Tasks</h1>
    <div class="field has-addons add-task">
      <p class="control is-expanded">
        <input class="input" type="text" v-model="newTask.description" placeholder="What is my task?">
      </p>
      <p class="control">
        <input class="input" type="text" v-model="newTask.duedate" placeholder="Due Date" onfocus="(this.type='date')" onblur="if(this.value==''){this.type='text'}">
      </p>
      <p class="control">
        <button class="button is-info" @click="addTask(newTask)">
          &plus;
        </button>
      </p>
    </div>
    <div class="table-center">
      <table class="table">
        <thead>
          <tr>
            <td colspan="6">
              <div class="tabs is-centered">
                <ul>
                  <li :class="{ 'is-active': filter === 'all' }" @click="changeFilter('all')"><a>All</a></li>
                  <li :class="{ 'is-active': filter === 'completed' }" @click="changeFilter('completed')"><a>Completed Tasks</a></li>
                  <li :class="{ 'is-active': filter === 'archived' }" @click="changeFilter('archived')"><a>Archived Tasks</a></li>
                </ul>
              </div>
            </td>
          </tr>
          <tr class="th">
            <th><input type="checkbox" v-model="selectAll"></th>
            <th>ID</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Date Created</th>
            <th class="has-text-centered">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(task, index) in taskItems" :key="index">
            <td><input type="checkbox" v-model="selectedTasks" :value="task.id"></td>
            <td><a :href="`/tasks/${task.id}`">{{task.id}}</a></td>
            <td>
                <input v-if="editing && taskId == task.id" v-model="task.description" type="text">
                <a :href="`/tasks/${task.id}`" v-else>{{task.description}}</a>
            </td> 
            <td>
                <input v-if="editing && taskId == task.id" v-model="task.duedate" type="date">
                <a v-else>{{task.duedate}}</a>
            </td>
            <td>{{task.datecreated}}</td>
            <td>
              <div class="has-addons" v-if="!editing && !taskId">
                <button class="button" v-if="!task.archived" @click="archiveTasks(task.id)">Archive</button>
                <button class="button" @click="deleteTasks(task.id)">Delete</button>
                <button class="button" @click="editTask(task)">Edit</button>
              </div>
              <div v-else-if="editing && taskId == task.id" class="has-addons">
                 <button class="button" @click="updateTask(task)">Save</button>
                 <button class="button" @click="cancel">Cancel</button>  
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="level-left">
        <button class="button" :disabled="selectedTasks.length == 0" @click="archiveTasks">Archive All</button>
        <button class="button" :disabled="selectedTasks.length == 0" @click="deleteTasks">Delete All</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: 'tasks',
    props: ['tasks'],
    data(){
        return{
            taskId: "", 
            editing: false,
            taskItems: JSON.parse(JSON.stringify(this.tasks)),
            newTask:{
              description: '',
              duedate: ''
            },
            selectedTasks: []
        }
    },
    computed:{
      filter(){
        return this.$store.state.tasks.filter
      },
      selectAll:{
        get: function(){
          return this.taskItems ? this.selectedTasks.length == this.taskItems.length : false;
        },
        set: function(value){
          var selected = []

          if(value){  
            this.taskItems.forEach((task) => {
              selected.push(task.id)
            })
          }
          
          this.selectedTasks = selected
        }
      }
    },
    watch:{
      tasks:{
        handler(tasks){
          this.taskItems = JSON.parse(JSON.stringify(tasks))
        },
        deep: true
      }
    },
    methods:{
        editTask(task){
          this.taskId = task.id
          this.editing = true
        },
        cancel(){
          this.taskId = ""
          this.editing = false
        },
        updateTask(task){
          this.$store.dispatch('tasks/updateTask', task)
          this.cancel()
        },
        changeFilter(filter) {
          if(this.selectedTasks.length > 0){
            this.selectedTasks = []
          }

          if(this.taskId && this.editing){
            this.taskId = ''
            this.editing = false
          }

          this.$store.dispatch('tasks/updateFilter', filter)
        },
        addTask(task){
          if(!task.description){
            return
          }
          this.$store.dispatch('tasks/addTask', task)
          this.newTask = { description: '', duedate: '' }
        },
        archiveTasks(id){
          this.$store.dispatch('tasks/archiveTasks', id)
        },
        deleteTasks(id){
          this.$store.dispatch('tasks/deleteTasks', id)
        }
    }
}
</script>
