let computerChoice;
let userChoice;
let isWinner = false;

while (!isWinner) {
    userChoice = prompt('Сделай выбор: камень, ножницы или бумага');
    userChoice = userChoice.toLowerCase();

    let randomNumber = Math.floor(Math.random() * 3);

    if (userChoice === 'камень' || userChoice === 'ножницы' || userChoice === 'бумага') {
        switch (randomNumber) {
            case 0:
                computerChoice = 'камень';
                break;
            case 1:
                computerChoice = 'ножницы';
                break;
            case 2:
                computerChoice = 'бумага';
                break;
        }
        alert(`Компьютер выбрал ${computerChoice}`)

        if (userChoice === computerChoice) {
            alert('Ничья!!!');
            } else {
                const isUserWinner =
                (userChoice === 'камень' && computerChoice === 'ножницы'
                || userChoice === 'ножницы' && computerChoice === 'бумага'
                || userChoice === 'бумага' && computerChoice === 'камень');
                const message = isUserWinner ? 'Ты победитель!' : 'Компьютер выиграл!';
                alert(message);
                isWinner = true;
            }
        } else alert('Введи правильный вариант!!!');
}

