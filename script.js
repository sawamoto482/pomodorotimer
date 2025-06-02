class PomodoroTimer {
    constructor() {
        this.timerDisplay = document.getElementById('timer-display');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.workBtn = document.getElementById('work-btn');
        this.shortBreakBtn = document.getElementById('short-break-btn');
        this.longBreakBtn = document.getElementById('long-break-btn');

        this.timeLeft = 1500; // 25分（初期値）
        this.isRunning = false;
        this.interval = null;
        this.currentMode = 'work';

        this.setupEventListeners();
        this.updateDisplay();
    }

    setupEventListeners() {
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.workBtn.addEventListener('click', () => this.setMode('work'));
        this.shortBreakBtn.addEventListener('click', () => this.setMode('short-break'));
        this.longBreakBtn.addEventListener('click', () => this.setMode('long-break'));
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.interval = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            if (this.timeLeft <= 0) {
                this.pause();
                this.playSound();
            }
        }, 1000);
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.timeLeft = this.getTimeForMode(this.currentMode);
        this.updateDisplay();
    }

    setMode(mode) {
        this.currentMode = mode;
        this.reset();
        this.updateModeButtons();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    updateModeButtons() {
        const modeButtons = [this.workBtn, this.shortBreakBtn, this.longBreakBtn];
        modeButtons.forEach(btn => btn.classList.remove('active'));
        const currentButton = document.getElementById(`${this.currentMode}-btn`);
        currentButton.classList.add('active');
    }

    getTimeForMode(mode) {
        switch (mode) {
            case 'work':
                return 1500; // 25分
            case 'short-break':
                return 300;  // 5分
            case 'long-break':
                return 900;  // 15分
            default:
                return 1500;
        }
    }

    playSound() {
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.play();
    }
}

// タイマーの初期化
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});
