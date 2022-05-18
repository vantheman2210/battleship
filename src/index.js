
import Gameboard from './gameboard'; 
import Player from './player'; 
import render from './domControl';

const test1 = Gameboard([1, 2, 3, 4]); 
const test2 = Player(test1); 

const test3 = Gameboard([1, 2, 3, 4]); 
const test4 = Player(test2); 

render(test1, test3);