
let total = 0;


function mapInputToIncrement(n) {

    const map = {
        1: 1,
        2: 2,
        3: 2.5,
        4: 3.5,
        5: 4,
        6: 5,
        7: 6,
        8: 7,
        9: 8,
        10: 9,
        12: 10,
        15: 12
    };

    return map[n] ?? null;
}

function formatNumber(n) {

    if (Number.isInteger(n)) return String(n);
    return (Math.round(n * 100) / 100).toFixed(2).replace(/\.00$/, '');
}

function updateUI() {
    const resultEl = document.getElementById('result');
    resultEl.textContent = `Total: ${formatNumber(total)}`;
}

function showMessage(msg, isError = false) {
    const msgEl = document.getElementById('message');
    msgEl.textContent = msg;
    msgEl.style.color = isError ? 'crimson' : '#333';
}

function appendHistory(entry) {
    const list = document.getElementById('history');
    if (!list) return;
    const li = document.createElement('li');
    li.textContent = entry;
    list.insertBefore(li, list.firstChild);
}

function addValue() {
    const inputEl = document.getElementById('valueInput');
    const raw = inputEl.value;
    if (raw === '') {
        showMessage('Please enter a value between 1 and 15.', true);
        return;
    }

    const n = Number(raw);
    if (!Number.isInteger(n) || n < 1 || n > 15) {
        showMessage('Invalid input. Please enter an integer from 1 to 15.', true);
        return;
    }

    const increment = mapInputToIncrement(n);
    if (increment === null) {
        showMessage('No mapping for that input.', true);
        return;
    }

    total = Math.round((total + increment) * 100) / 100;
    updateUI();
    showMessage(`Added ${formatNumber(increment)}.`);
    appendHistory(`${formatNumber(increment)} added (input ${n}) — total ${formatNumber(total)}`);


    inputEl.value = '';
    inputEl.focus();
}

function resetAll() {
    total = 0;
    updateUI();
    showMessage('All values reset.');
    const list = document.getElementById('history');
    if (list) list.innerHTML = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('valueInput');
    const addBtn = document.getElementById('addBtn');
    const resetBtn = document.getElementById('resetBtn');
    if (addBtn) addBtn.addEventListener('click', addValue);
    if (resetBtn) resetBtn.addEventListener('click', resetAll);

 
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                addValue();
                e.preventDefault();
            }
        });
    }

    updateUI();
});