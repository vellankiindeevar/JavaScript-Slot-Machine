// 1. deposite some money 
// 2. determine no of lines to bet on 
// 3. collect a bet amount 
// 4. spin the slot machine 
// 5. check if the user won 
// 6. give the user their winning 
// 7. play again


const prompt = require("prompt-sync")();

const rows = 3;
const cols = 3;

const symbols_count = {
	a:2,
	b:4,
	c:6,
	d:8
}
const symbols_values = {
	a:5,
	b:4,
	c:3,
	d:2
}



const deposite = () => {
	while (true){
		const depositeAmount = prompt("enter a deposite amount: ");
		const numberDepositeAmount = parseFloat(depositeAmount); 
		if (isNaN(numberDepositeAmount) || numberDepositeAmount <= 0){
			console.log('invalid deposite amount , try again.');
		}else{
			return numberDepositeAmount;
		}
	}
};

const getNumberOfLines = () => {
	while (true){
		const lines = prompt("enter the number of lines to bet on (1-3): ");
		const numberoflines = parseFloat(lines); 
		if (isNaN(numberoflines) || numberoflines <= 0 || numberoflines > 3){
			console.log('invalid deposite amount , try again.');
		}else{
			return numberoflines;
		}
	}
};


const getbet = (balance,lines) => {
	while (true){
		const bet = prompt("enter the bet amount per line : ");
		const numberbet = parseFloat(bet); 
		if (isNaN(numberbet) || numberbet <= 0 || numberbet > balance/lines){
			console.log('invalid bet , try again.');
		}else{
			return numberbet;
		}
	}
};

const spin = () => {
	const symbols = [];
	for (const [symbol,count] of Object.entries(symbols_count)){
		for (let i =0 ;i<count; i++){
			symbols.push(symbol)
		}
	};
	const reels = [];
	for (let i = 0;i<cols;i++){
		reels.push([]);
		const reelsymbols = [...symbols];
		for (j=0; j<rows;j++){
			const randomindex = Math.floor(Math.random() * reelsymbols.length);
			const selectedsymbol = reelsymbols[randomindex];
			reels[i].push(selectedsymbol);
			reelsymbols.splice(randomindex,1);

		}

	}
	return reels;
};

const transpose = (reels) => {
  const row = [];

  for (let i = 0; i < rows; i++) {
    row.push([]);
    for (let j = 0; j < cols; j++) {
      row[i].push(reels[j][i]);
    }
  }

  return row;
};

const printRows = (rows) => {
  for (const row of rows) {
    let rowString = "";
    for (const [i, symbol] of row.entries()) {
      rowString += symbol;
      if (i != row.length - 1) {
        rowString += " | ";
      }
    }
    console.log(rowString);
  }
};

const getWinnings = (rows, bet, lines) => {
  let winnings = 0;

  for (let row = 0; row < lines; row++) {
    const symbols = rows[row];
    let allSame = true;

    for (const symbol of symbols) {
      if (symbol != symbols[0]) {
        allSame = false;
        break;
      }
    }

    if (allSame) {
      winnings += bet * symbol_values[symbols[0]];
    }
  }

  return winnings;
};

const game = () => {
  let balance = deposite();

  while (true) {
    console.log("You have a balance of $" + balance);
    const numberOfLines = getNumberOfLines();
    const bet = getbet(balance, numberOfLines);
    balance -= bet * numberOfLines;
    const reels = spin();
    const rows = transpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet, numberOfLines);
    balance += winnings;
    console.log("You won, $" + winnings.toString());

    if (balance <= 0) {
      console.log("You ran out of money!");
      break;
    }

    const playAgain = prompt("Do you want to play again (y/n)? ");

    if (playAgain != "y") break;
  }
};

game();
