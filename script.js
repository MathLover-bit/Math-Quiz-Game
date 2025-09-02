let score = 0;
let highScore = 0;
let correctAnswer;
let currentPlayer = "";

function startGame() {
    const nameInput = document.getElementById("playerName").value.trim();
    if (nameInput === "") {
        alert("Please enter your name to play!");
        return;
    }

    currentPlayer = nameInput;
    document.getElementById("login").style.display = "none";
    document.getElementById("game").style.display = "block";
    document.getElementById("welcome").innerText = `Welcome, ${currentPlayer}!`;

    // Load saved high score for this player
    highScore = localStorage.getItem(currentPlayer + "_highScore") || 0;
    document.getElementById("highscore").innerText = `High Score: ${highScore}`;

    score = 0;
    document.getElementById("scoreboard").innerText = `Score: ${score}`;
    generateProblem();
}

function generateProblem() {
    let num1, num2, operators;

    if (score < 5) {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operators = ['+', '-'];
    } else if (score < 10) {
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        operators = ['+', '-', '*'];
    } else {
        num1 = Math.floor(Math.random() * 50) + 1;
        num2 = Math.floor(Math.random() * 50) + 1;
        operators = ['+', '-', '*', '/'];
    }

    const operator = operators[Math.floor(Math.random() * operators.length)];
    document.getElementById('problem').innerText = `${num1} ${operator} ${num2}`;

    if (operator === '+') correctAnswer = num1 + num2;
    if (operator === '-') correctAnswer = num1 - num2;
    if (operator === '*') correctAnswer = num1 * num2;
    if (operator === '/') correctAnswer = (num1 / num2).toFixed(2);

    generateOptions();
}

function generateOptions() {
    let options = [correctAnswer];

    while (options.length < 4) {
        let wrongAnswer;

        if (typeof correctAnswer === "number") {
            wrongAnswer = correctAnswer + Math.floor(Math.random() * 10 - 5);
        } else {
            wrongAnswer = (parseFloat(correctAnswer) + (Math.random() * 2 - 1)).toFixed(2);
        }

        if (wrongAnswer !== correctAnswer && !options.includes(wrongAnswer)) {
            options.push(wrongAnswer);
        }
    }

    options = options.sort(() => Math.random() - 0.5);

    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = "";
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.innerText = option;
        btn.onclick = () => checkAnswer(option);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(choice) {
    let resultText = "";

    if (choice == correctAnswer) {
        resultText = "✅ Correct!";
        score++;
    } else {
        resultText = `❌ Wrong! The answer was ${correctAnswer}.`;
    }

    document.getElementById('result').innerText = resultText;
    document.getElementById('scoreboard').innerText = `Score: ${score}`;

    if (score > highScore) {
        highScore = score;
        localStorage.setItem(currentPlayer + "_highScore", highScore);
        document.getElementById('highscore').innerText = `High Score: ${highScore}`;
    }

    setTimeout(() => {
        document.getElementById('result').innerText = "";
        generateProblem();
    }, 1000);
}
