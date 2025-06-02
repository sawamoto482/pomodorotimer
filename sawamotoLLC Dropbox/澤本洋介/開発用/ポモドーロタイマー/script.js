let timer;
let isRunning = false;
let timeLeft = 25 * 60; // 25分を秒に変換
let isWorkTime = true; // 作業時間中かどうかのフラグ

// 要素の取得
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const workTimeInput = document.getElementById('work-time');
const breakTimeInput = document.getElementById('break-time');

// タイマーの更新
function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// タイマーの開始
function startTimer() {
    if (isRunning) return;
    
    isRunning = true;
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();
        } else {
            // 時間が終了したら
            clearInterval(timer);
            isRunning = false;
            
            // 作業時間と休憩時間の切り替え
            isWorkTime = !isWorkTime;
            if (isWorkTime) {
                timeLeft = workTimeInput.value * 60;
            } else {
                timeLeft = breakTimeInput.value * 60;
            }
            
            // アラート音を鳴らす
            const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
            audio.play();
            
            updateTimer();
        }
    }, 1000);
}

// タイマーの停止
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

// タイマーのリセット
function resetTimer() {
    stopTimer();
    timeLeft = workTimeInput.value * 60;
    isWorkTime = true;
    updateTimer();
}

// イベントリスナーの設定
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

// 初期表示
updateTimer();
