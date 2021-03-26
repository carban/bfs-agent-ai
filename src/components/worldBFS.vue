<template lang="html">
  <div class="">
    <h1>BFS Search</h1>
    <!-- <img src="@/assets/brick.png" alt=""> -->
    <div class="mi-container">
      <div class="row" v-for="(element, pos) in matrix" :key="pos">
        <div class="cell col" v-for="(item, index) in matrix[pos]" :key="index">
          <img class="imagecell" :src="item.img" alt="">
        </div>
      </div>
      <div class="controls row">
        <button class="btn btn-primary" v-on:click="up()">up</button>
        <button class="btn btn-primary" v-on:click="down()">down</button>
        <button class="btn btn-primary" v-on:click="right()">right</button>
        <button class="btn btn-primary" v-on:click="left()">left</button>
        <button class="btn btn-success" v-on:click="main()">Play Agent</button>
        <button class="btn btn-danger" v-on:click="stopLoop()">Stop Agent</button>
      </div>
    </div>
  </div>
</template>

<script>
const brick = {val: 1, img:require('@/assets/brick.png')};
const empty = {val: 0, img:''};
const ai = {val: 10, img:require('@/assets/marvin.png')};
const goal = {val: -1, img:require('@/assets/coin.gif')};

class node {
  constructor(data, pointer) {
    this.data = data;
    this.pointer = pointer;
  }
}

var agent = {
  id: 1,
  x: 1,
  y: 1,
  //Actions
  up(map){
    if (map[this.x-1][this.y].val!=1) {
      map[this.x][this.y]=empty;
      map[this.x-1][this.y]=ai;
      this.x = this.x-1;
      return map;
    }else{
      return map;
    }
  },
  down(map){
    if (map[this.x+1][this.y].val!=1) {
      map[this.x][this.y]=empty;
      map[this.x+1][this.y]=ai;
      this.x = this.x+1;
      return map;
    }else{
      return map;
    }
  },
  right(map){
    if (map[this.x][this.y+1].val!=1) {
      map[this.x][this.y]=empty;
      map[this.x][this.y+1]=ai;
      this.y = this.y+1;
      return map;
    }else{
      return map;
    }
  },
  left(map){
    if (map[this.x][this.y-1].val!=1) {
      map[this.x][this.y]=empty;
      map[this.x][this.y-1]=ai;
      this.y = this.y-1;
      return map;
    }else{
      return map;
    }
  },
  exe(rule, map){
    if(rule=='up'){
      return this.up(map);
    }else if(rule=='down'){
      return this.down(map);
    }else if(rule=='left'){
      return this.left(map);
    }else if(rule=='right'){
      return this.right(map);
    }
  }
};

export default {
  data(){
    return{
      matrix: [[brick, brick, brick, brick, brick, brick, brick, brick, brick ,brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, empty, empty, empty, empty, brick],
               [brick, brick, brick, brick, brick, brick, brick, brick, brick ,brick]],
      aloop: null,
      marvin: [7,3, "FIRST"],
      objective: [2,6],
      map: [[0, 0, 1, 0, 1, 0, 0, 0],
            [1, 0, 1, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 1, 1,-1, 0],
            [0, 0, 1, 1, 0, 1, 0, 0],
            [0, 1, 0, 1, 0, 0, 1, 1],
            [0, 0, 0, 0, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 1, 0],
            [0, 1, 0, 0, 1, 1, 0, 0]],
      solution: null,
      queue: [],
      repeats: [],
      instructions: [],
      iterator: 1,
    }
  },
  methods: {
    update(rule, agent){
      // copia para que no modifique por referencia
      let pos = [agent[0], agent[1]];

      if (rule=="UP") {
        if (pos[0]-1 >= 0 && this.map[pos[0]-1][pos[1]]!=1) {
          pos[0]--;
        }
        return [pos[0], pos[1], "UP"];
      }
      else if (rule=="RIGHT") {
        if (pos[1]+1 <= this.map[0].length-1 && this.map[pos[0]][pos[1]+1]!=1) {
          pos[1]++;
        }
        return [pos[0], pos[1], "RIGHT"];
      }
      else if (rule=="DOWN") {
        if (pos[0]+1 <= this.map[0].length-1 && this.map[pos[0]+1][pos[1]]!=1) {
          pos[0]++;
        }
        return [pos[0], pos[1], "DOWN"];
      }
      else if (rule=="LEFT") {
        if (pos[1]-1 >= 0 && this.map[pos[0]][pos[1]-1]!=1) {
          pos[1]--;
        }
        return [pos[0], pos[1], "LEFT"];
      }else {
        return [pos[0], pos[1], "TAKE"];
      }
    },
    isEqual(pos1, final){
      if (pos1[0]==final[0] && pos1[1]==final[1]) {
        return true;
      }else{
        return false;
      }
    },
    search(pos1, list){
      for (var i = 0; i < list.length; i++) {
        if (this.isEqual(pos1, list[i])) {
          return true
        }
      }
      return false;
    },
    getInstructions(){
      var sol = this.solution;
      var instructions = [];
      while (sol!=null) {
        instructions.unshift(sol.data[2]);
        sol = sol.pointer;
      }
      return instructions;
    },
    solver(){

      let present = null;
      let count = 0;

      while (this.queue.length!=0) {

        present = this.queue[0]; //primer elemento de la cola
        if (this.isEqual(present.data, this.objective)) {
          console.log("---- SOLVED ----");
          this.solution = new node(this.update("TAKE", present.data), present); //Guarda la "rama" solucion
          return count; //Termina el programa porque encontro solucion
        } //nodo presente
        else if (this.search(present.data, this.repeats)) {
          this.queue.shift();
          //No se expande, por eso no suma, solo se saca el repetido
        }
        else{
          this.repeats.push(present.data);
          this.queue.push(new node(this.update("UP",    present.data), present));
          this.queue.push(new node(this.update("RIGHT", present.data), present));
          this.queue.push(new node(this.update("DOWN",  present.data), present));
          this.queue.push(new node(this.update("LEFT",  present.data), present));
          this.queue.shift();
          // queue.unshift(new node(update("UP",    present.data), present));
          // queue.unshift(new node(update("RIGHT", present.data), present));
          // queue.unshift(new node(update("DOWN",  present.data), present));
          // queue.unshift(new node(update("LEFT",  present.data), present));
          count++;
        }
      }
      //No hubo solucion
      this.solution = new node(null, null);
      return count;
    },
    main(){
       this.queue = [new node(this.marvin, null)];
       // console.log("---- INITAL MAP ----");
       // console.log(this.map);
       // console.log("Initial posicion: ", this.marvin);
       console.log("Number of expantions: ",this.solver());

       if (this.solution.data==null) {
         console.log("---- NO SOLUTION ----");
       }else{
         this.instructions = this.getInstructions();
         // console.log(this.instructions);
         this.play();
       }

       //   for (var i = 1; i < finalRules.length; i++) {
       //     console.log(i, finalRules[i]);
       //   }
       //   console.log("---- FINAL MAP ----");
       //   this.map[this.solution.data[0]][this.solution.data[1]] = "X";
       //   console.log(this.map);
       // }
    },
    up(){
      this.matrix = agent.up(this.matrix);
      this.$forceUpdate();
    },
    down(){
      this.matrix = agent.down(this.matrix);
      this.$forceUpdate();
    },
    right(){
      this.matrix = agent.right(this.matrix);
      this.$forceUpdate();
    },
    left(){
      this.matrix = agent.left(this.matrix);
      this.$forceUpdate();
    },
    play(){
      if (this.iterator==this.instructions.length-1) {
        this.stopLoop();
      }else{
        this.aloop = setTimeout(()=>{this.iteration()},600);
      }
    },
    iteration(){
      var action = this.instructions[this.iterator];
      if (action=="UP") {
        this.up();
      }else if(action=="DOWN"){
        this.down();
      }else if(action=="LEFT"){
        this.left();
      }else if (action=="RIGHT") {
        this.right();
      }else{
        this.stopLoop();
      }
      this.iterator++;
      this.play();
    },
    stopLoop(){
      clearInterval(this.aloop);
      this.iterator = 0;
      this.solution = null;
      this.queue = [];
      this.repeats = [];
      this.instructions = [];
      // this.agent = {x: 1, y: 1};
    }
  },
  created(){
    agent.x = this.marvin[0]+1;
    agent.y = this.marvin[1]+1;
    for (var i = 0; i < this.map.length; i++) {
      for (var j = 0; j < this.map.length; j++) {
        if(this.map[i][j]==1){
          this.matrix[i+1][j+1] = brick
        }else if(this.map[i][j]==0){
          this.matrix[i+1][j+1] = empty;
        }else if(this.map[i][j]==-1){
          this.matrix[i+1][j+1] = goal;
        }
      }
    }
    //marvin
    this.matrix[this.marvin[0]+1][this.marvin[1]+1] = ai;

  }
}
</script>

<style lang="css" scoped>
  .cell{
    background-color: #2ECCFA;
    /* height: 80px; */
    margin-top: 1px;
    margin-left: 1px;
    font-size: 30px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .mi-container{
    /* width: 540px; */
    width: 700px;
  }
  .controls{
    width: 100%;
    margin-left: -33px;
    margin-top: 10px;
  }
  .controls > .btn{
    margin-right: 10px;
  }
  .imagecell{
    /* height: 80px; */
    height: 60px;
  }
</style>
