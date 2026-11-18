let currentCategory = 'all';

function filterSigns(category, btnElement) {
    currentCategory = category;

    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    applyFilters();
}

function searchSigns() {
    applyFilters();
}

function applyFilters() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.sign-card');

    cards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const desc = card.querySelector('p').textContent.toLowerCase();
        const matchesCategory = (currentCategory === 'all' || card.classList.contains(currentCategory));
        const matchesSearch = (title.includes(searchText) || desc.includes(searchText));

        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

const quizData = [
    {
        question: "Di Indonesia, rambu berbentuk belah ketupat berwarna dasar kuning dengan simbol hitam berfungsi sebagai apa?",
        options: [
            "Rambu Peringatan bahaya atau kondisi jalan di depan",
            "Rambu Larangan masuk bagi kendaraan roda dua",
            "Rambu Petunjuk arah menuju jalan tol"
        ],
        correct: 0,
        explanation: "Sesuai standar Permenhub RI, warna dasar kuning pada rambu lalu lintas menandakan peringatan agar pengendara waspada."
    },
    {
        question: "Apa arti rambu lingkaran berwarna merah dengan garis putih mendatar di tengahnya (rambu verboden)?",
        options: [
            "Wajib berhenti untuk pemeriksaan petugas",
            "Dilarang masuk bagi semua kendaraan dari arah tersebut",
            "Batas akhir kecepatan maksimum"
        ],
        correct: 1,
        explanation: "Rambu lingkaran merah dengan palang putih mendatar berarti Dilarang Masuk karena jalur tersebut satu arah dari depan."
    },
    {
        question: "Jika kamu melihat rambu lingkaran biru bertuliskan angka '40' berwarna putih, apa maksudnya?",
        options: [
            "Dilarang melaju lebih dari 40 km/jam",
            "Jarak menuju kota berikutnya tinggal 40 km",
            "Perintah kecepatan minimum yang wajib dipenuhi adalah 40 km/jam"
        ],
        correct: 2,
        explanation: "Lingkaran biru berisi angka adalah Rambu Perintah batas kecepatan minimum, sedangkan lingkaran putih tepi merah adalah batas maksimum."
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuiz() {
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');
    const progressEl = document.getElementById('quiz-progress');

    if (!questionEl || !optionsEl) return;

    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';
    optionsEl.innerHTML = '';

    if (currentQuestionIndex < quizData.length) {
        const currentQuiz = quizData[currentQuestionIndex];
        progressEl.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${quizData.length}`;
        questionEl.textContent = currentQuiz.question;

        currentQuiz.options.forEach((optionText, index) => {
            const button = document.createElement('button');
            button.textContent = optionText;
            button.classList.add('quiz-btn');
            button.onclick = () => selectAnswer(index, button);
            optionsEl.appendChild(button);
        });
    } else {
        progressEl.textContent = 'Simulasi Selesai';
        questionEl.textContent = `Skor Akhir Kamu: ${score} dari ${quizData.length} Benar`;
        feedbackEl.style.color = '#d4af37';
        feedbackEl.textContent = score === quizData.length 
            ? 'Sempurna! Kamu siap menjadi pelopor keselamatan berkendara.' 
            : 'Bagus! Pelajari kembali kartu rambu di atas untuk menyempurnakan pemahamanmu.';
        
        nextBtn.textContent = 'Ulangi Simulasi';
        nextBtn.style.display = 'inline-block';
        nextBtn.onclick = restartQuiz;
    }
}

function selectAnswer(selectedIndex, selectedBtn) {
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');
    const allButtons = document.querySelectorAll('.quiz-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.correct) {
        score++;
        selectedBtn.style.backgroundColor = 'rgba(34, 197, 94, 0.15)';
        selectedBtn.style.borderColor = '#22c55e';
        feedbackEl.style.color = '#4ade80';
        feedbackEl.textContent = `Jawaban Tepat. ${currentQuiz.explanation}`;
    } else {
        selectedBtn.style.backgroundColor = 'rgba(239, 68, 68, 0.15)';
        selectedBtn.style.borderColor = '#ef4444';
        allButtons[currentQuiz.correct].style.borderColor = '#22c55e';
        feedbackEl.style.color = '#f87171';
        feedbackEl.textContent = `Kurang Tepat. ${currentQuiz.explanation}`;
    }

    nextBtn.textContent = currentQuestionIndex < quizData.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir';
    nextBtn.style.display = 'inline-block';
    nextBtn.onclick = () => {
        currentQuestionIndex++;
        loadQuiz();
    };
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    loadQuiz();
}

document.addEventListener('DOMContentLoaded', loadQuiz);
