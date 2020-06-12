<template>
  <div class="main-container">
    <task :task="getSubTask"/>
  </div>
</template>

<script>
import Task from "@/components/Task"
export default {
  components:{
    Task
  },
  data() {
    return {
      
    }
  },
  validate({ params, store }){
    return store.state.tasks.allTasks.some(el => el.id == params.id)
  },
  mounted(){
    this.$store.dispatch('tasks/getSubTask', this.$route.params.id)
  },
  computed: {
    getSubTask(){
      return this.$store.getters['tasks/getSubTask']
    }
  }
}
</script>

<style>

</style>