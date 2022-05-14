import Ship from './shipFactory';  
import Gameboard from './gameboard';

const test = Gameboard([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]); 


console.log(test.board) 
for(let i = 1;  i < 18; ++i) { 
  test.receiveAttack(i);
} 
console.log(test.board)
 
 

 
 
