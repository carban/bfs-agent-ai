<template lang="html">
  <div class="">
    <h1>Model-based reflex agent</h1>
    <!-- <img src="@/assets/brick.png" alt=""> -->
    <div class="mi-container">
      <div class="row" v-for="(element, pos) in matrix" :key="pos">
        <div class="cell col" v-for="(item, index) in matrix[pos]" :key="index">
          <img class="imagecell" :src="item.img" alt="">
        </div>
      </div>
      <div class="controls row">
        <button class="btn btn-primary" v-on:click="btn_up()">up</button>
        <button class="btn btn-primary" v-on:click="btn_down()">down</button>
        <button class="btn btn-primary" v-on:click="btn_right()">right</button>
        <button class="btn btn-primary" v-on:click="btn_left()">left</button>
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

class agent {
  constructor(x, y, internalMatrix){
    this.x = x;
    this.y = y;
    this.internal = internalMatrix.map(arr => {return arr.slice()});
  }
  getState(){
    //Given map, Retruns the estate of the actual position of the agent
    var radio = [this.internal[this.x-1][this.y].val,
                this.internal[this.x][this.y+1].val,
                this.internal[this.x+1][this.y].val,
                this.internal[this.x][this.y-1].val];
    return radio;
  }
  rule(state){
    //Given state, Call an action
    if(state[0]==8 && state[1]==0 && state[2]==0 && state[3]==8){
      return 'right';
    }else if(state[0]==0 && state[1]==8 && state[2]==0 && state[3]==5){ //eventual goal
      return 'goal-left';
    }else if(state[0]==8 && state[1]==8 && state[2]==0 && state[3]==5){ //eventual goal
      return 'goal-left';
    }else if(state[0]==8 && state[1]==0 && state[2]==0 && state[3]==0){
      return 'right';
    }else if(state[0]==8 && state[1]==8 && state[2]==0 && state[3]==0){
      return 'down';
    }else if(state[0]==0 && state[1]==8 && state[2]==0 && state[3]==0){
      return 'down';
    }else if(state[0]==0 && state[1]==8 && state[2]==8 && state[3]==0){
      return 'left';
    }else if(state[0]==0 && state[1]==0 && state[2]==8 && state[3]==0){
      return 'left';
    }else if(state[0]==0 && state[1]==0 && state[2]==8 && state[3]==8){
      return 'up';
    }else if(state[0]==0 && state[1]==0 && state[2]==0 && state[3]==8){
      return 'up';
    }else if(state[0]==0 && state[1]==8 && state[2]==0 && state[3]==8){
      return 'down';
    }else if(state[0]==8 && state[1]==0 && state[2]==8 && state[3]==0){
      return 'right';
    }else if(state[0]==0 && state[1]==0 && state[2]==0 && state[3]==0){
      return 'up';
    }else if(state[0]==8 && state[1]==0 && state[2]==8 && state[3]==8){
      return 'right';
    }else if(state[0]==8 && state[1]==8 && state[2]==0 && state[3]==8){
      return 'down';
    }else if(state[0]==8 && state[1]==8 && state[2]==8 && state[3]==0){
      return 'left';
    }else{
      return 'up';
    }
    // console.log(state);
  }
  //Actions
  up(map){
    if (this.internal[this.x-1][this.y].val==0 && map[this.x-1][this.y].val==0) {
      map[this.x][this.y]=empty;
      map[this.x-1][this.y]=ai;
      this.internal[this.x][this.y]=brick;
      this.internal[this.x-1][this.y]=ai;
      this.x = this.x-1;
      return map;
    }else{
      return map;
    }
  }
  down(map){
    if (this.internal[this.x+1][this.y].val==0 && map[this.x+1][this.y].val==0) {
      map[this.x][this.y]=empty;
      map[this.x+1][this.y]=ai;
      this.internal[this.x][this.y]=brick;
      this.internal[this.x+1][this.y]=ai;
      this.x = this.x+1;
      return map;
    }else{
      return map;
    }
  }
  right(map){
    if (this.internal[this.x][this.y+1].val==0 && map[this.x][this.y+1].val==0) {
      map[this.x][this.y]=empty;
      map[this.x][this.y+1]=ai;
      this.internal[this.x][this.y]=brick;
      this.internal[this.x][this.y+1]=ai;
      this.y = this.y+1;
      return map;
    }else{
      return map;
    }
  }
  left(map){
    if (this.internal[this.x][this.y-1].val==0 && map[this.x][this.y-1].val==0) {
      map[this.x][this.y]=empty;
      map[this.x][this.y-1]=ai;
      this.internal[this.x][this.y]=brick;
      this.internal[this.x][this.y-1]=ai;
      this.y = this.y-1;
      return map;
    }else{
      return map;
    }
  }
  goalLeft(map){
    if (this.internal[this.x][this.y-1].val==5 && map[this.x][this.y-1].val==5) {
      map[this.x][this.y]=empty;
      map[this.x][this.y-1]=ai;
      this.internal[this.x][this.y]=brick;
      this.internal[this.x][this.y-1]=ai;
      this.y = this.y-1;
      return map;
    }else{
      return map;
    }
  }
  exe(rule, mapp){
    if(rule=='up'){
      return this.up(mapp);
    }else if(rule=='down'){
      return this.down(mapp);
    }else if(rule=='left'){
      return this.left(mapp);
    }else if(rule=='right'){
      return this.right(mapp);
    }else{
      return this.goalLeft(mapp);
    }
  }
}

export default {
  data(){
    return{
      matrix: [[brick, brick, brick, brick, brick, brick],
               [brick, ai, empty, empty, empty, brick],
               [brick, empty, empty, empty, empty, brick],
               [brick, empty, empty, empty /*goal*/, empty, brick],
               [brick, empty, empty, empty, empty, brick],
               [brick, brick, brick, brick, brick, brick]],
      aloop: null,
      myAgent: null
    }
  },
  methods: {
    btn_up(){
      this.matrix = this.myAgent.up(this.matrix);
      this.$forceUpdate();
    },
    btn_down(){
      this.matrix = this.myAgent.down(this.matrix);
      this.$forceUpdate();
    },
    btn_right(){
      this.matrix = this.myAgent.right(this.matrix);
      this.$forceUpdate();
    },
    btn_left(){
      this.matrix = this.myAgent.left(this.matrix);
      this.$forceUpdate();
    },
    play(){
      this.aloop = setTimeout(()=>{this.iteration()},600);
    },
    iteration(){
      this.matrix = this.myAgent.exe(this.myAgent.rule(this.myAgent.getState()), this.matrix);
      this.$forceUpdate();
      this.play();
    },
    stopLoop(){
      clearInterval(this.aloop);
    }
  },
  created(){
   this.myAgent = new agent(1, 1, this.matrix);
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
