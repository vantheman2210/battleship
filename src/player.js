function Player(gameboard) {
	const boardPlayer = Array.from({ length: 100 }, (_, i) => i); 
	const boardComputer = Array.from({ length: 100 }, (_, i) => i);
	const playerAttack = (attack) => {
		if (boardPlayer[attack] !== 'attacked') {
			boardPlayer[attack] = 'attacked';
			return gameboard.receiveAttack(attack);
		}
		return 'illegal move';
	};

	const computerAttack = () => {
		const board = boardComputer.filter(slot => slot !== 'attacked');  
		const randomAttack = board[Math.floor(Math.random() * board.length)]
		boardComputer[randomAttack] = 'attacked';  
	  gameboard.receiveAttack(randomAttack);	 
		return boardComputer[randomAttack];
	};

	return {
		playerAttack,
		computerAttack,
		boardComputer, 
		boardPlayer
	};
}

export default Player;
