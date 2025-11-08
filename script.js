// script.js — compatible with A–D option format

const categoryFiles = {
  nis: "questions/nis_questions.js",
  nfs: "questions/fire_service_questions.js",
  nscdc: "questions/civil_defence_questions.js",
  ncos: "questions/correctional_questions.js",
};

let allQuestions = [];
let currentQuestionIndex = 0;
let selectedAnswers = {};
let timerInterval;
let timeRemaining = 30 * 60;
let currentCategory = "";

// Elements
const landing = document.getElementById("landing");
const exam = document.getElementById("exam");
const fallback = document.getElementById("fallback");
const result = document.getElementById("result");
const questionText = document.getElementById("questionText");
const optionsList = document.getElementById("optionsList");
const qIndicator = document.getElementById("qIndicator");
const timerDisplay = document.getElementById("timer");

// Helper — shuffle
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Load questions
async function loadQuestions(categoryKey) {
  const filePath = categoryFiles[categoryKey];
  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error("File not found");
    const text = await res.text();

    const varMatch = text.match(/const\s+([A-Z0-9_]+)\s*=/);
    if (!varMatch) throw new Error("Invalid format");
    const varName = varMatch[1];

    eval(text);
    allQuestions = shuffle(eval(varName)).slice(0, 50);
    return true;
  } catch (err) {
    console.error("Error loading file:", err);
    return false;
  }
}

// Render question
function renderQuestion() {
  const q = allQuestions[currentQuestionIndex];
  if (!q) return;

  qIndicator.textContent = `Question ${currentQuestionIndex + 1} of ${allQuestions.length}`;
  questionText.textContent = q.question;
  optionsList.innerHTML = "";

  for (const [key, value] of Object.entries(q.options)) {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = `${key}. ${value}`;
    btn.onclick = () => selectOption(key);
    if (selectedAnswers[currentQuestionIndex] === key) {
      btn.classList.add("selected");
    }
    optionsList.appendChild(btn);
  }

  document.getElementById("prevBtn").disabled = currentQuestionIndex === 0;
  document.getElementById("nextBtn").classList.toggle("hidden", currentQuestionIndex === allQuestions.length - 1);
  document.getElementById("submitBtn").classList.toggle("hidden", currentQuestionIndex < allQuestions.length - 1);
}

function selectOption(letter) {
  selectedAnswers[currentQuestionIndex] = letter;
  renderQuestion();
}

// Navigation
document.getElementById("nextBtn").onclick = () => {
  if (currentQuestionIndex < allQuestions.length - 1) {
    currentQuestionIndex++;
    renderQuestion();
  }
};
document.getElementById("prevBtn").onclick = () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    renderQuestion();
  }
};

// Timer
function startTimer() {
  timerInterval = setInterval(() => {
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      submitExam();
      return;
    }
    timeRemaining--;
    const m = Math.floor(timeRemaining / 60);
    const s = timeRemaining % 60;
    timerDisplay.textContent = `${m}:${s < 10 ? "0" + s : s}`;
  }, 1000);
}

// Submit
function submitExam() {
  clearInterval(timerInterval);
  exam.classList.add("hidden");
  result.classList.remove("hidden");

  let score = 0;
  const missed = [];

  allQuestions.forEach((q, i) => {
    const userAns = selectedAnswers[i];
    if (userAns === q.answer) score++;
    else missed.push({ ...q, yourAnswer: userAns || "—" });
  });

  document.getElementById("resultSummary").innerHTML = `
    <h3>Score: ${score}/${allQuestions.length}</h3>
    <p>Percentage: ${(score / allQuestions.length * 100).toFixed(1)}%</p>
  `;

  const missedDiv = document.getElementById("missedContainer");
  missedDiv.innerHTML = missed.map(m => `
    <div class="missed-q">
      <p><strong>${m.question}</strong></p>
      <p>Your answer: ${m.yourAnswer}</p>
      <p>Correct: ${m.answer}</p>
      <p class="explanation"><em>${m.explanation || ""}</em></p>
    </div>
  `).join("");
}

// Retake
document.getElementById("retakeBtn").onclick = () => window.location.reload();

// Start exam
document.querySelectorAll(".start-btn").forEach(btn => {
  btn.addEventListener("click", async e => {
    const key = e.target.closest(".cat-card").dataset.key;
    currentCategory = key;
    landing.classList.add("hidden");
    exam.classList.remove("hidden");

    const ok = await loadQuestions(key);
    if (!ok) {
      exam.classList.add("hidden");
      fallback.classList.remove("hidden");
      document.getElementById("fallbackText").textContent =
        `The question file for "${key.toUpperCase()}" could not be loaded.`;
      return;
    }

    currentQuestionIndex = 0;
    selectedAnswers = {};
    timeRemaining = 30 * 60;
    renderQuestion();
    startTimer();
  });
});

// Category selection toggle
document.querySelectorAll(".select-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    document.querySelectorAll(".start-btn").forEach(b => b.classList.add("hidden"));
    e.target.classList.add("hidden");
    e.target.nextElementSibling.classList.remove("hidden");
  });
});
