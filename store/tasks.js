

export const state = () => ({
  task:{},
  filter: 'all',
  allTasks: [{
      id: 1,
      description: 'Buy food',
      duedate: "",
      datecreated: new Date().toLocaleDateString(),
      subtasks: [],
      completed: false,
      archived: false,
    },
    {
      id: 2, 
      description: 'Prepare dinner',
      duedate: "",
      datecreated: new Date().toLocaleDateString(),
      subtasks: [],
      completed: false,
      archived: false,
    },
    {
      id: 3,  
      description: 'To task on Update Sales',
      duedate: "",
      datecreated: new Date().toLocaleDateString(),
      subtasks: [],
      completed: true,
      archived: false,
    },
    {
      id: 4,  
      description: 'Refactor code',
      duedate: "",
      datecreated: new Date().toLocaleDateString(),
      subtasks: [],
      completed: false,
      archived: true,
    }
  ]
})

export const getters = {
    tasksFiltered(state) {
      if (state.filter == 'all') {
        return state.allTasks
      } else if (state.filter == 'archived') {
        return state.allTasks.filter(task => task.archived)
      } else if (state.filter == 'completed') {
        return state.allTasks.filter(task => task.completed)
      }

      return state.allTasks
    },
    getSubTask(state){
      return state.task
    }
}

export const mutations = {
    updateFilter(state, filter){
      state.filter = filter
    },
    getTasks(state){
      state.allTasks = state.allTasks
    },
    getSubTask(state, id){
      state.task = state.allTasks.find(el => el.id == id)
    },
    updateTask(state, task){
      const id = state.allTasks.find(el => el.id == task.id)
      state.allTasks.splice(id, 1 ,{
        id: task.id,
        description: task.description,
        duedate: task.duedate,
        datecreated: new Date().toLocaleDateString(),
        completed: false
      })
    },
    addTask(state, task){
      state.allTasks.push({
        id: state.allTasks[state.allTasks.length - 1].id++,
        description: task.description,
        duedate: task.duedate,
        datecreated: new Date().toLocaleDateString(),
        completed: false
      })
    },
    archiveTasks(state, id){
      if(isNaN(id)){
        state.allTasks.forEach((el) => {
          if(!el.archived){
            el.archived = true
          }
        })
      }else{
        let task = state.allTasks.find(el => el.id == id)
        task.archived = true
      }
    },
    deleteTasks(state, id){
      if(isNaN(id)){
        state.allTasks = []
      }else{
        state.allTasks.splice(state.allTasks.findIndex(el => el.id == id), 1)
      }
    },
    addSubTask(state, data){
      state.allTasks.forEach(el => {
        if(data.id == el.id){
          el.subtasks.push({
            id: Math.round(Math.random() * 10),
            description: data.newSubTask,
            datecreated: new Date().toLocaleDateString(),
            completed: false
          })
        } 
      })
    },
    updateSubTask(state, data){
      state.allTasks.forEach(el => {
        if(data.id == el.id){
          el.subtasks.forEach(e => {
            if(data.subTask.id == e.id){
              e.description = data.subTask.description
            }
          })
        }
      })
    },
    deleteSubTask(state, data){
      state.allTasks.forEach(el => {
        if(data.id == el.id){
          el.subtasks.splice(el.subtasks.findIndex(e => data.subTask.id == e.id ), 1)
        }
      })
    }
}

export const actions = {
    getTasks({commit}){
      commit('getTasks')
    },
    getSubTask({commit}, id){
      commit('getSubTask', id)
    },
    updateTask({commit}, task){
      commit('updateTask', task)
    },
    updateFilter({commit}, filter){
      commit('updateFilter', filter)
    },
    addTask({commit}, task){
      commit('addTask', task)
    },
    archiveTasks({commit}, id){
      commit('archiveTasks', id)
    },
    deleteTasks({commit}, id){ 
      commit('deleteTasks', id)
    },
    addSubTask({commit}, data){
      commit('addSubTask', data)
    },
    updateSubTask({commit}, data){
      commit('updateSubTask', data)
    },
    deleteSubTask({commit}, data){
      commit('deleteSubTask', data)
    }
}