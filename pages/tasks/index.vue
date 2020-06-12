<template>
  <div class="main-container">
    <tasks :tasks="tasksFiltered"/>
    <nuxt-child/>
  </div>
</template>

<script>
import Tasks from "@/components/Tasks"
import { mapGetters } from 'vuex'


export default {
  components:{
    Tasks
  },
  data() {
    return {
    }
  },
  mounted(){
  },
  computed:{
    ...mapGetters('tasks', [
      'tasksFiltered'
    ])
  },
  methods:{
  }
}
</script>
