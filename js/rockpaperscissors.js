const choices = ['rock','paper','scissors'];

function pickAWinner(myChoice, compChoice) {
  if (myChoice === compChoice){
    return 'It\'s a tie!';
  }

  else if (myChoice === 'rock'){
    if(compChoice === 'paper'){
    return 'You LOSE because paper beats rock!';
    }
    else if (compChoice === 'scissors'){
      return 'You WIN because rock beats scissors!';
    }
  }

  else if (myChoice === 'paper'){
    if(compChoice === 'rock'){
    return 'You WIN because paper beats rock!';
    }
    else if (compChoice === 'scissors'){
      return 'You LOSE because scissors beats paper!';
    }
  }

  else if (myChoice === 'scissors'){
    if(compChoice === 'rock'){
    return 'You LOSE because rock beats scissors!';
    }
    else if (compChoice === 'paper'){
      return 'You WIN because scissors beats paper!';
    }
  }

  else {
    return 'Your choice makes no sense. Please choose from rock, paper, and scissors. Press play to try again!';
  }
}

function playGame(){
  let myChoice = (prompt('Rock, paper, or scissors?')).toLowerCase();
  let compIndex = Math.floor(Math.random() * 3);
  let compChoice = choices[compIndex];
  let result = pickAWinner(myChoice, compChoice);
  console.log(result);
  document.querySelector('#result').innerHTML = result;
}