/*8 PUZZLE with BFS Algorithm*/

function update(state, mapi, posi) {
  let map = mapi.map(arr => {return arr.slice()});
  let pos = posi;
  if (state=="UP") {
    if (pos[0]!=0) {
      map[pos[0]][pos[1]] = map[pos[0]-1][pos[1]];
      map[pos[0]-1][pos[1]] = 0;
      pos = [pos[0]-1, pos[1]];
      return {world: map, newPos: pos, rule: "UP"};
    }else{
      return {world: map, newPos: pos, rule: "UP"};
    }

  }else if (state=="LEFT") {
    if (pos[1]!=0) {
      map[pos[0]][pos[1]] = map[pos[0]][pos[1]-1];
      map[pos[0]][pos[1]-1] = 0;
      pos = [pos[0], pos[1]-1];
      return {world: map, newPos: pos, rule: "LEFT"};
    }else{
      return {world: map, newPos: pos, rule: "LEFT"};
    }

  }else if (state=="RIGHT") {
    if (pos[1]!=2) {
      map[pos[0]][pos[1]] = map[pos[0]][pos[1]+1];
      map[pos[0]][pos[1]+1] = 0;
      pos = [pos[0], pos[1]+1];
      return {world: map, newPos: pos, rule: "RIGHT"};
    }else{
      return {world: map, newPos: pos, rule: "RIGHT"};
    }

  }else if (state=="DOWN") {
    if (pos[0]!=2) {
      map[pos[0]][pos[1]] = map[pos[0]+1][pos[1]];
      map[pos[0]+1][pos[1]] = 0;
      pos = [pos[0]+1, pos[1]];
      return {world: map, newPos: pos, rule: "DOWN"};
    }else{
      return {world: map, newPos: pos, rule: "DOWN"};;
    }

  }else {
    console.log("No lo c Rick...");
  }
}

function printm(matrix){
  for (var i = 0; i < 3; i++) {
    console.log(matrix[i]);
  }
}

function isEqual(m1, m2){
  if (m1.length==m2.length) {
    for (var i = 0; i < m1.length; i++) {
      for (var j = 0; j < m1.length; j++) {
        if (m1[i][j]!=m2[i][j]) {
          return false;
        }
      }
    }
    return true;
  }
  return false;
}

function search(map, list){
  if (list.length==0) {
    return false;
  }else{
    for (var i = 0; i < list.length; i++) {
      if (isEqual(map, list[i])) {
        return true;
      }
    }
    return false;
  }
}

var solution = null;

class node {
  constructor(data, pointer) {
    this.data = data;
    this.pointer = pointer;
  }
}

function getInstructions(){
  var sol = solution;
  var instructions = [];
  while (sol!=null) {
    instructions.unshift(sol.data.rule);
    sol = sol.pointer;
  }
  return instructions;
}

const final_map = [[1, 2, 3],
                   [4, 5, 6],
                   [7, 8, 0]];

function solver(queue, repeats){

  let present = null;
  let count = 0;

  while (queue.length!=0) {

    present = queue[0]; //primer elemento de la cola

    if (isEqual(present.data.world, final_map)) {
      console.log("---- SOLVED ----");
      // printm(queue[0].data.world);
      solution = present; //Guarda la "rama" solucion
      return count; //Termina el programa porque encontro solucion
    }
    else if (search(present.data.world, repeats)) {
      queue.shift();
      //No se expande, por eso no suma, solo se saca el repetido
    }
    else{
      repeats.push(present.data.world);
      queue.push(new node(update("UP",    present.data.world, present.data.newPos), present));
      queue.push(new node(update("RIGHT", present.data.world, present.data.newPos), present));
      queue.push(new node(update("DOWN",  present.data.world, present.data.newPos), present));
      queue.push(new node(update("LEFT",  present.data.world, present.data.newPos), present));
      queue.shift();
      // queue.unshift(new node(update("UP",    present.data.world, present.data.newPos), present));
      // queue.unshift(new node(update("RIGHT", present.data.world, present.data.newPos), present));
      // queue.unshift(new node(update("DOWN",  present.data.world, present.data.newPos), present));
      // queue.unshift(new node(update("LEFT",  present.data.world, present.data.newPos), present));

      count++;
    }
  }
  //No hubo solucion
  solution = new node(null, null);
  return count;
}

function main(){

  // (?)
  let map = [[7, 5, 2],
             [1, 8, 6],
             [0, 3, 4]];

  let pos = [2,0];

  // let map = [[1, 2, 3],
  //            [4, 5, 6],
  //            [7, 0, 8]];
  //
  // let pos = [2,1];

  // let map = [[0, 2, 3],
  //            [1, 8, 5],
  //            [4, 7, 6]];
  //
  // let pos = [0,0];

  // let map = [[2, 8, 0],
  //            [1, 5, 3],
  //            [4, 7, 6]];
  //
  // let pos = [0,2];

  // (?)
  // let map = [[4, 1, 2],
  //            [5, 8, 3],
  //            [0, 7, 6]];
  //
  // let pos = [0,2];

  // let map = [[1, 0, 2],
  //            [4, 5, 3],
  //            [7, 8, 6]];
  //
  // let pos = [0,1];

  let queue = [new node({world: map, newPos: pos, rule:"FIRST"}, null)];

  let repeats = [];

  console.log("---- BFS Algorithm ----");
  console.log("---- INITAL MAP ----");
  printm(queue[0].data.world);
  console.log("Number of expantions: ",solver(queue, repeats));
  if (solution==null || solution.data==null) {
    console.log("---- NO SOLUTION ----");
  }else{
    console.log("Instrucions: ");
    let finalRules = getInstructions();
    for (var i = 1; i < finalRules.length; i++) {
      console.log(i, finalRules[i]);
    }
  }
}

main();
