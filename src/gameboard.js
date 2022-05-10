import Ship from './shipFactory'
// Function that places ships on board, and receives attacks, and keeping track of missed shots 
function Gameboard () {  
  const board = [1, 2, 3, 4, 5, 6, 7 ,8 , 10, 11, 12, 13, 14, 15, 16, 17 ,18 ,19 , 20]; 
  const missedAttack = [];
  const test = Ship([1, 2, 3, 4]);  
  const shipPosition = test.coordinates; 
   
  // Function that determines whether attack hit a ship
  const receiveAttack = (attack) => {  
    if(shipPosition[attack]) { 
      test.isHit(attack);
    } else { 
      missedAttack.push(attack);
    } 

  // Function that checks whether all ships have been sunk 
  const allShipsSunk = () => shipPosition.every((element) => element === 'hit');
  };

  return { 
    shipPosition, 
    receiveAttack, 
    allShipsSunk,
  }
} 

export default Gameboard;