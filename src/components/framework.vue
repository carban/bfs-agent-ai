<template lang="html">
  <div class="">
    <h1>Framework</h1>
    <!-- <img src="@/assets/brick.png" alt=""> -->
    <div class="mi-container">
      <div class="row" v-for="(element, pos) in matrix" :key="pos">
        <div class="cell col" v-for="(item, index) in matrix[pos]" :key="index">
          <img class="imagecell" :src="item.img" alt="">
        </div>
      </div>
      <div class="controls row">
        <button class="btn btn-success" v-on:click="getmap()">Map</button>
        <button class="btn btn-success" v-on:click="solve()">Solve</button>
        <button class="btn btn-primary" v-on:click="up()">up</button>
        <button class="btn btn-primary" v-on:click="down()">down</button>
        <button class="btn btn-primary" v-on:click="right()">right</button>
        <button class="btn btn-primary" v-on:click="left()">left</button>
        <button class="btn btn-danger" v-on:click="stopLoop()">Stop Agent</button>
      </div>

    </div>

  </div>

</template>

<script>

const brick = {val: 1, img:require('@/assets/brick.png')};
const empty = {val: 0, img:''};
const ai = {val: 2, img:require('@/assets/marvin.png')};
const goal = {val: -1, img:require('@/assets/coin.gif')};
import axios from 'axios'
export default {
  data(){
    return{
      matrix: [[brick, brick, brick, brick, brick, brick],
               [brick, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, brick],
               [brick, brick, brick, brick, brick, brick]],
      agent: {x: 1, y: 1},
      aloop: null,
      instructions: [],
      iterator: 0
    }
  },
  methods: {
    up(){
      if (this.matrix[this.agent.x-1][this.agent.y].val==0 || this.matrix[this.agent.x-1][this.agent.y].val==-1) {
        this.matrix[this.agent.x][this.agent.y]=empty;
        this.matrix[this.agent.x-1][this.agent.y]=ai;
        this.agent.x = this.agent.x-1;
        this.$forceUpdate();
      }
    },
    right(){
      if (this.matrix[this.agent.x][this.agent.y+1].val==0 || this.matrix[this.agent.x][this.agent.y+1].val==-1) {
        this.matrix[this.agent.x][this.agent.y]=empty;
        this.matrix[this.agent.x][this.agent.y+1]=ai;
        this.agent.y = this.agent.y+1;
        this.$forceUpdate();
      }
    },
    left(){
      if (this.matrix[this.agent.x][this.agent.y-1].val==0 || this.matrix[this.agent.x][this.agent.y-1].val==-1) {
        this.matrix[this.agent.x][this.agent.y]=empty;
        this.matrix[this.agent.x][this.agent.y-1]=ai;
        this.agent.y = this.agent.y-1;
        this.$forceUpdate();
      }
    },
    down(){
      if (this.matrix[this.agent.x+1][this.agent.y].val==0 || this.matrix[this.agent.x+1][this.agent.y].val==-1) {
        this.matrix[this.agent.x][this.agent.y]=empty;
        this.matrix[this.agent.x+1][this.agent.y]=ai;
        this.agent.x = this.agent.x+1;
        this.$forceUpdate();
      }
    },
    solve(){
      axios.get('http://localhost:8000/solve')
        .then(res =>{
          this.instructions = res.data.acts;
          this.play();
        })
        .catch(err => {
          console.log(err);
        })
    },
    getmap(){
      axios.get('http://localhost:8000/map')
        .then(res =>{
          var map = res.data.map;
          var bot = res.data.pos;
          for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map.length; j++) {
              if(map[i][j]==1){
                this.matrix[i+1][j+1] = brick
              }else if(map[i][j]==0){
                this.matrix[i+1][j+1] = empty;
              }else if(map[i][j]==-1){
                this.matrix[i+1][j+1] = goal;
              }
            }
          }
          this.matrix[bot.y + 1][bot.x + 1] = ai;
          this.agent = {x: bot.y + 1, y: bot.x + 1};
          // console.log(this.agent.x, this.agent.y);
          this.$forceUpdate();
        })
        .catch(err => {
          console.log(err);
        })
    },
    play(){
      if (this.iterator==this.instructions.length) {
        this.stopLoop();
      }else{
        this.aloop = setTimeout(()=>{this.iteration()},600);
      }
    },
    iteration(){
      var action = this.instructions[this.iterator].action;
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
      // this.agent = {x: 1, y: 1};
    }
  },
  created(){

  }
}
</script>

<style lang="css" scoped>
  .cell{
    background-color: #2ECCFA;
    height: 80px;
    margin-top: 1px;
    margin-left: 1px;
    font-size: 30px;
    padding-left: 0px;
    padding-right: 0px;
  }
  .mi-container{
    width: 540px;
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
    height: 80px;
  }
</style>
