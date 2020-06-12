<template>
  <div>
    <div class="columns">
      <aside class="column is-2 aside has-background-grey-lighter">
        <nav class="menu is-dark">
          <h1 class="title is-3">Task Managr</h1>
          <ul class="menu-list">
            <li><a class="is-active" href="/"><span class="icon is-small"><i class="fa fa-tachometer"></i></span>
                Home</a></li>
            <li><a href="/tasks"><span class="icon is-small"><i
                    class="fa fa-pencil-square-o"></i></span> Tasks</a></li>
          </ul>
        </nav>
      </aside>
      <div class="column main">
        <nuxt />
      </div>
    </div>
  </div>
</template>

