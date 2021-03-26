<template>
  <div id="app">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <div class="row">
      <div class="col">
        <center><router-view/></center>
      </div>
      <div class="menu">
        <ul class="list-group">
          <router-link class="list-group-item list-group-item-action list-group-item-dark" :to="{ name: 'world', params: {} }">simple</router-link>
          <router-link class="list-group-item list-group-item-action list-group-item-dark" :to="{ name: 'worldModels', params: {} }">Model-based</router-link>
          <router-link class="list-group-item list-group-item-action list-group-item-dark" :to="{ name: 'frameworkClass', params: {} }">frameworkClass</router-link>
          <router-link class="list-group-item list-group-item-action list-group-item-dark" :to="{ name: 'worldBFS', params: {} }">BFS</router-link>

        </ul>
      </div>
    </div>
  </div>
</template>
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>

<script>
import world from './components/world.vue'

export default {
  name: 'app',
  components: {
    world
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.footer {
   position: absolute;
   left: 0;
   bottom: 0;
   width: 100%;
   background-color: gray;
   color: white;
   text-align: center;
}
.menu{
  width:200px;
  height: 100px;
  top: 60px;
  /* right: 500px; */
  left: 0%;
  position: relative;
}

</style>
