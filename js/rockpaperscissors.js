const choices = ['rock','paper','scissors'];

function pickAWinner(myChoice, compChoice) {
  if (myChoice === compChoice){
    return 'It\'s a tie';
  }

  else if (myChoice === 'rock'){
    if(compChoice === 'paper'){
    return 'You lose because paper beats rock!';
    }
    else if (compChoice === 'scissors'){
      return 'You win because rock beats scissors!';
    }
  }

  else if (myChoice === 'paper'){
    if(compChoice === 'rock'){
    return 'You win because paper beats rock!';
    }
    else if (compChoice === 'scissors'){
      return 'You lose because scissors beats paper!';
    }
  }

  else if (myChoice === 'scissors'){
    if(compChoice === 'rock'){
    return 'You lose because rock beats scissors!';
    }
    else if (compChoice === 'paper'){
      return 'You win because scissors beats paper!';
    }
  }

  else {
    return 'Your choice makes no sense - press play to try again';
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