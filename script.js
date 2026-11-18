// --- 1. FITUR FILTER & PENCARIAN RAMBU ---
let currentCategory = 'all';

function filterSigns(category, btnElement) {
    currentCategory = category;

    // Update tampilan tombol aktif
    const buttons = document.querySelectorAll('.btn-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    applyFilters();
}

function searchSigns() {
    applyFilters();
}

function applyFilters() {
    const searchText = document.getElementById('search-input').value.toLowerCase();
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

// --- 2. SISTEM KUIS INTERAKTIF MULTI-SOAL ---
const quizData = [
    {
        question: "Kamu melihat rambu berbentuk belah ketupat berwarna kuning dengan gambar jalan berkelok. Apa yang harus kamu lakukan?",
        options: [
            "Menambah kecepatan agar cepat melewati tikungan",
            "Mengurangi kecepatan dan bersiap menghadapi tikungan tajam",
            "Langsung berhenti mendadak di tengah jalan"
        ],
        correct: 1,
        explanation: "Rambu kuning adalah rambu peringatan. Kamu wajib waspada dan menurunkan kecepatan."
    },
    {
        question: "Apa arti dari rambu lingkaran bertepi merah dengan huruf 'S' yang dicoret garis merah?",
        options: [
            "Dilarang Stop (Berhenti) di area tersebut",
            "Dilarang Salip kendaraan di depan",
            "Area khusus parkir sepeda motor"
        ],
        correct: 0,
        explanation: "Huruf 'S' dicoret berarti Dilarang Stop (berhenti sejenak maupun parkir)."
    },
    {
        question: "Rambu berbentuk lingkaran berwarna dasar biru dengan tanda panah putih termasuk jenis rambu apa?",
        options: [
            "Rambu Larangan",
            "Rambu Peringatan Bahaya",
            "Rambu Perintah yang wajib diikuti"
        ],
        correct: 2,
        explanation: "Warna dasar biru pada rambu lalu lintas menandakan perintah yang wajib dipatuhi pengendara."
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

    // Reset tampilan
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
        // Tampilkan hasil akhir kuis
        progressEl.textContent = 'Kuis Selesai!';
        questionEl.textContent = `Skor Akhir Kamu: ${score} dari ${quizData.length} benar!`;
        feedbackEl.style.color = '#2563eb';
        feedbackEl.textContent = score === quizData.length 
            ? '🎉 Luar biasa! Kamu siap menjadi pengendara muda yang patuh aturan!' 
            : '👍 Bagus! Terus pelajari rambu di atas agar makin paham keselamatan jalan.';
        
        nextBtn.textContent = 'Ulangi Kuis';
        nextBtn.style.display = 'inline-block';
        nextBtn.onclick = restartQuiz;
    }
}

function selectAnswer(selectedIndex, selectedBtn) {
    const currentQuiz = quizData[currentQuestionIndex];
    const feedbackEl = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('next-btn');
    const allButtons = document.querySelectorAll('.quiz-btn');

    // Nonaktifkan semua tombol setelah memilih
    allButtons.forEach(btn => btn.disabled = true);

    if (selectedIndex === currentQuiz.correct) {
        score++;
        selectedBtn.style.borderColor = '#16a34a';
        selectedBtn.style.backgroundColor = '#dcfce7';
        feedbackEl.style.color = '#16a34a';
        feedbackEl.textContent = `✅ Tepat! ${currentQuiz.explanation}`;
    } else {
        selectedBtn.style.borderColor = '#ef4444';
        selectedBtn.style.backgroundColor = '#fee2e2';
        allButtons[currentQuiz.correct].style.borderColor = '#16a34a';
        feedbackEl.style.color = '#dc2626';
        feedbackEl.textContent = `❌ Kurang tepat. ${currentQuiz.explanation}`;
    }

    nextBtn.textContent = currentQuestionIndex < quizData.length - 1 ? 'Soal Berikutnya ➡️' : 'Lihat Hasil Akhir';
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

// Jalankan kuis saat halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadQuiz);
