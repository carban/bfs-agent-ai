<template lang="html">
  <div class="">
    <h1>Simple reflex agent</h1>
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
        <button class="btn btn-success" v-on:click="play()">Play Agent</button>
        <button class="btn btn-danger" v-on:click="stopLoop()">Stop Agent</button>
      </div>

    </div>

  </div>

</template>

<script>
const brick = {val: 8, img:require('@/assets/brick.png')};
const empty = {val: 0, img:''};
const ai = {val: 1, img:require('@/assets/marvin.png')};
const goal = {val: 5, img:require('@/assets/coin.gif')};

var agent = {
  id: 1,
  x: 1,
  y: 1,
  getState(map){
    //Given map, Retruns the estate of the actual position of the agent
    var radio = [map[this.x-1][this.y].val, map[this.x][this.y+1].val, map[this.x+1][this.y].val, map[this.x][this.y-1].val];
    return radio;
  },
  rule(state){
    //Given state, Call an action
    if(state[0]!=0 && state[1]==0 && state[2]==0 && state[3]!=0){
      return 'right';
    }else if(state[0]==0 && state[1]!=0 && state[2]==0 && state[3]==5){ //eventual goal
      return 'goal-left';
    }else if(state[0]!=0 && state[1]==0 && state[2]==0 && state[3]==0){
      return 'left'; //RIGHT
    }else if(state[0]!=0 && state[1]!=0 && state[2]==0 && state[3]==0){
      return 'left'; //DOWN
    }else if(state[0]==0 && state[1]!=0 && state[2]==0 && state[3]==0){
      return 'up'; //DOWN
    }else if(state[0]==0 && state[1]!=0 && state[2]!=0 && state[3]==0){
      return 'up'; //LEFT
    }else if(state[0]==0 && state[1]==0 && state[2]!=0 && state[3]==0){
      return 'up'; //LEFT
    }else if(state[0]==0 && state[1]==0 && state[2]!=0 && state[3]!=0){
      return 'up';
    }else if(state[0]==0 && state[1]==0 && state[2]==0 && state[3]!=0){
      return 'up';
    }else if(state[0]==0 && state[1]!=0 && state[2]==0 && state[3]!=0){
      return 'down';
    }else if(state[0]!=0 && state[1]==0 && state[2]!=0 && state[3]==0){
      return 'left'; //right
    }else if(state[0]==0 && state[1]==0 && state[2]==0 && state[3]==0){
      return 'up';
    }else if(state[0]!=0 && state[1]==0 && state[2]!=0 && state[3]!=0){
      return 'right';
    }else{
      return 'up';
    }
    // console.log(state);
  },
  //Actions
  up(map){
    if (map[this.x-1][this.y].val==0) {
      map[this.x][this.y]=empty;
      map[this.x-1][this.y]=ai;
      this.x = this.x-1;
      return map;
    }else{
      return map;
    }
  },
  down(map){
    if (map[this.x+1][this.y].val==0) {
      map[this.x][this.y]=empty;
      map[this.x+1][this.y]=ai;
      this.x = this.x+1;
      return map;
    }else{
      return map;
    }
  },
  right(map){
    if (map[this.x][this.y+1].val==0) {
      map[this.x][this.y]=empty;
      map[this.x][this.y+1]=ai;
      this.y = this.y+1;
      return map;
    }else{
      return map;
    }
  },
  left(map){
    if (map[this.x][this.y-1].val==0) {
      map[this.x][this.y]=empty;
      map[this.x][this.y-1]=ai;
      this.y = this.y-1;
      return map;
    }else{
      return map;
    }
  },
  goalLeft(map){
    if (map[this.x][this.y-1].val==5) {
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
    }else{
      return this.goalLeft(map);
    }
  }
};

export default {
  data(){
    return{
      matrix: [[brick, brick, brick, brick, brick, brick],
               [brick, empty, empty, empty, empty, brick],
               [brick, brick, empty, empty, brick, brick],
               [brick, goal, empty, empty, empty, brick],
               [brick, empty, empty, brick, ai, brick],
               [brick, brick, brick, brick, brick, brick]],
      aloop: null
    }
  },
  methods: {
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
      this.aloop = setTimeout(()=>{this.iteration()},600);
    },
    iteration(){
      this.matrix = agent.exe(agent.rule(agent.getState(this.matrix)), this.matrix);
      this.$forceUpdate();
      this.play();
    },
    stopLoop(){
      clearInterval(this.aloop);
    }
  },
  created(){
    agent.x = 4;
    agent.y = 4;
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
