let getPlayerChoice = () => {
    return new Promise((resolve) => {
        const buttons = document.querySelectorAll(".buttons");

        buttons.forEach((btn) => {
            btn.addEventListener("click", () => {
                const choice = parseInt(btn.id);
                resolve(choice);
            });
        });
    });
};

let cpuChoose = () => {
    num = Math.floor(Math.random() * 3);
    return num;
};

let playRound = async () => {
    let pChoice = await getPlayerChoice(); // Wait for player's choice
    let cpuChoice = cpuChoose();

    let score = pChoice - cpuChoice;

    // 0 ties
    // 1, -2 player beats cpu
    // 2, -1 player loses to cpu

    if (score == 1 || score == -2) {
        announceWinner("Player", pChoice, cpuChoice);
    } else if (score == 2 || score == -1) {
        announceWinner("CPU", pChoice, cpuChoice);
    } else if (score == 0) {
        announceWinner("draw", pChoice, cpuChoice);
    }
};

let announceWinnerTimeout;

let announceWinner = (winner, pChoice, cpuChoice) => {

    clearTimeout(announceWinnerTimeout);

    var gameResults = document.getElementsByClassName("gameResults"); 
    var outcome = " ";
    gameResults[0].style.display = "flex";

    if (winner != 'draw') {
        if (winner == "Player") {loser = "CPU";} else {loser = "Player";}
        outcome = " beats "
    } else {
        winner = "Player"
        loser = "CPU"
        outcome = " ties "
    }

    if (cpuChoice == 0) {
        cpuChoice = "Rock";
    } else if (cpuChoice == 1) {
        cpuChoice = "Paper";
    } else if (cpuChoice == 2) {
        cpuChoice = "Scissors";

    };
    

    gameResults[0].textContent = "CPU chose " + cpuChoice + ". " + winner + outcome + loser + "!";

    //setTimeout(code, delay)  this causes code to run after a set delay
    announceWinnerTimeout = setTimeout(() => {
        for (i = 0; i < gameResults.length; i++) {
            gameResults[i].style.display = "none";
        };
    }, 2500);
    
};

let playGame = async () => {
    while (true) {
        await playRound();
    }
};

let main = async () => {
    // applyDynamicStyles();
    playGame();
}

main();