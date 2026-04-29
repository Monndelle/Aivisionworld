const symbols = ['🍒', '🔔', '💎', '🍋', '7️⃣', '⭐'];
let balance = 1000;
let freeSpins = 0;

const reels = [
    document.getElementById('reel1'),
    document.getElementById('reel2'),
    document.getElementById('reel3'),
    document.getElementById('reel4'),
    document.getElementById('reel5')
];

document.getElementById('spin-button').addEventListener('click', () => {
    const betInput = document.getElementById('bet-input');
    const bet = parseInt(betInput.value);

    if (balance < bet && freeSpins === 0) {
        alert("Nicht genug Guthaben!");
        return;
    }

    if (freeSpins > 0) {
        freeSpins--;
        updateStatus(`Free Spin! Noch ${freeSpins} übrig.`);
    } else {
        balance -= bet;
    }
    
    updateUI();
    spin();
});

function spin() {
    const results = reels.map(reel => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = randomSymbol;
        return randomSymbol;
    });

    checkWin(results);
}

function checkWin(results) {
    const counts = {};
    results.forEach(s => counts[s] = (counts[s] || 0) + 1);

    let won = false;
    for (let s in counts) {
        if (counts[s] >= 3) { // 3 gleiche Symbole = Bonus/Gewinn
            if (counts[s] >= 3 && !won) {
                freeSpins += 5; // Belohnung: 5 Free Spins
                updateStatus("BONUS! 3 gleiche = 5 Free Spins!");
                won = true;
            }
            balance += (parseInt(document.getElementById('bet-input').value) * counts[s]);
        }
    }

    if (!won) updateStatus("Kein Gewinn, versuch's nochmal!");
    updateUI();
}

function updateUI() {
    document.getElementById('balance').textContent = balance;
    document.getElementById('free-spins-alert').className = freeSpins > 0 ? "" : "hidden";
}

function updateStatus(msg) {
    document.getElementById('status').textContent = msg;
}

