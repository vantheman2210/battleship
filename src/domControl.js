import Gameboard from "./gameboard"; 

const container = document.querySelector('.container'); 
  

const render = (board1, board2) => { 
  // Creating grids for displaying boards
  const grid1 = document.createElement('grid'); 
  grid1.className = 'grid1' 
  const grid2 = document.createElement('grid');  
  grid2.className = 'grid2'
  
  board1.board.forEach(element => {
    const div = document.createElement('div');  
    div.className = 'box';
    grid1.appendChild(div); 
    container.append(grid1);
  }); 

  board2.board.forEach(element => {
    const div = document.createElement('div');  
    div.className = 'box';
    grid2.appendChild(div); 
    container.append(grid2);
  });

}; 

export default render;



// Event handlers 
