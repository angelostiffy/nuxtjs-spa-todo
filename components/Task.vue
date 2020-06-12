<template>
  <div class="sub-container">
      <h1 class="title has-text-left">{{task.description}}</h1>
      <ul class="task-list list">
        <li>
          <div class="field has-addons">
            <div class="control is-expanded ">
              <input class="input" v-model="newSubTask" type="text" placeholder="What is my task?">
            </div>
            <div class="control">
              <button class="button is-light" @click="cancel()">
                &times;
              </button>
            </div>
            <div class="control">
              <button class="button is-info" @click="addSubTask(newSubTask)">
                &plus;
              </button>
            </div>
          </div>
        </li>
        <li class="list-item" v-for="(task, index) in subTask.subtasks" :key="index">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <input class="checkbox" type="checkbox">
                <input class="input has-margin-left-5 has-width-350" v-if="editing && subTaskId == task.id" v-model="task.description" type="text">
                <span class="has-margin-left-5" v-else>{{task.description}}</span>
              </div>
            </div>
            <div class="level-right has-addons" >
              <div class="level-item" v-if="!editing && !subTaskId">
                <button class="button" @click="editSubTask(task.id)">&#x1F589;</button>
                <button class="button" @click="deleteSubTask(task)">&#128465;</button>
              </div>
              <div class="level-item" v-else-if="editing && subTaskId == task.id">
                <button class="button" @click="updateSubTask(task)">&#128190;</button>
                <button class="button" @click="cancelEditSubTask">&times;</button>
              </div>
            </div> 
          </div>
        </li>
      </ul>
      <div class="level-left">
        <button class="button">Delete All</button>
        <button class="button">Mark All Completed</button>
      </div>
  </div>
</template>

<script>
export default {
    name: 'task',
    props: ['task'],
    data(){
      return{
        subTaskId: "", 
        editing: false,
        newSubTask: '',
        subTask: JSON.parse(JSON.stringify(this.task))
      }
    },
    watch:{
      task:{
        handler(task){
          this.subTask = JSON.parse(JSON.stringify(task))
        },
        deep: true
      }
    },
    methods:{
      editSubTask(id){
        this.subTaskId = id, 
        this.editing = true
      },
      cancelEditSubTask(){
        this.subTaskId = '', 
        this.editing = false
      },
      cancel(){
        this.newSubTask = ''
      },
      addSubTask(newSubTask){
        if(!newSubTask){
          return
        }
        this.$store.dispatch('tasks/addSubTask', {newSubTask: newSubTask, id: this.subTask.id})
        this.cancel()      
      },
      updateSubTask(subTask){
        this.$store.dispatch('tasks/updateSubTask', {subTask: subTask, id: this.subTask.id})
        this.cancelEditSubTask()  
      },
      deleteSubTask(subTask){
        this.$store.dispatch('tasks/deleteSubTask', {subTask: subTask, id: this.subTask.id})
        this.cancelEditSubTask()  
      }
    }
}
</script>

