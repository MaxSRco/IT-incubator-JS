let computerChoice;
let userChoice;
let isWinner = false;

while (!isWinner) {
    userChoice = prompt('Сделай выбор: камень, ножницы или бумага');
    userChoice = userChoice.toLowerCase();
    let randomNumber = Math.floor(Math.random() * 3);

    if (
        userChoice === 'камень' ||
        userChoice === 'ножницы' ||
        userChoice === 'бумага')
        {if (randomNumber === 0) {
            computerChoice = 'камень';
            } else if (randomNumber === 1) {
            computerChoice = 'ножницы';
            } else computerChoice = 'бумага';
    alert(`Компьютер выбрал ${computerChoice}`)
    if (userChoice === computerChoice) {
        alert('Ничья!!!');
        } else if (userChoice === 'камень' && computerChoice === 'ножницы'
                    || userChoice === 'ножницы' && computerChoice === 'бумага'
                    || userChoice === 'бумага' && computerChoice === 'камень') {
            alert('Ты выиграл!');
            isWinner = true;
        } else {
            alert('Ты проиграл!');
            isWinner = true;
    }
    } else {
        alert('Введи правильный вариант!!!');
    }
}

