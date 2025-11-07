// script.js
// Core app logic for Mock Exam with webcam + mic detection
const CATEGORY_KEYS = ['nis','nfs','nscdc','ncos'];
const LS_KEY = 'mock_exam_questions_v1';

let questionPools = loadPoolsFromStorage(); // format: { nis: [...], nfs: [...], ... }

const categorySelect = document.getElementById('category');
const fileInput = document.getElementById('fileInput');
const pasteBtn = document.getElementById('pasteBtn');
const startBtn = document.getElementById('startBtn');
const statusDiv = document.getElementById('status');

const examSection = document.getElementById('exam');
const setupSection = document.getElementById('setup');
const resultSection = document.getElementById('result');

const timerEl = document.getElementById('timer');
const warningsEl = document.getElementById('warnCount');
const permText = document.getElementById('permText');
const video = document.getElementById('video');
const questionArea = document.getElementById('questionArea');

const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const submitBtn = document.getElementById('submitBtn');
const restartBtn = document.getElementById('restartBtn');

let currentCategory = '';
let examQuestions = []; // chosen 50
let answers = {}; // id -> chosen option 'A'|'B'...
let currentIndex = 0;
let timerInterval = null;
let timeLeftSec = 30 * 60;
let warnCount = 0;

// Media detection
let audioContext, analyser, mediaStreamSource;
let micStream;
let faceModelLoaded = false;
let detectionInterval = null;
let faceDetectionOptions;

async function initFaceApi(){
  permText.innerText = 'Loading face models...';
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/')
    // The above expects weights at CDN; face-api will fetch them - some CDNs host them.
    faceModelLoaded = true;
    permText.innerText = 'Face model loaded';
  } catch(e){
    console.warn('face-api models load error', e);
    permText.innerText = 'Face models failed to load (detection still attempts)';
  }
}

// ------------------- Storage helpers -------------------
function loadPoolsFromStorage(){
  try {
    const raw = localStorage.getItem(LS_KEY);
    if(!raw) {
      let empty = { nis: [], nfs: [], nscdc: [], ncos: [] };
      localStorage.setItem(LS_KEY, JSON.stringify(empty));
      return empty;
    }
    return JSON.parse(raw);
  } catch(e){
    console.error('load error', e);
    return { nis: [], nfs: [], nscdc: [], ncos: [] };
  }
}
function savePoolsToStorage(){
  localStorage.setItem(LS_KEY, JSON.stringify(questionPools));
}

// ------------------- UI: Upload / paste -------------------
fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const text = await file.text();
  handleJsonText(text);
  fileInput.value = '';
});

pasteBtn.addEventListener('click', async () => {
  const text = prompt('Paste JSON array of questions for the selected category:');
  if(text) handleJsonText(text);
});

function handleJsonText(text){
  const cat = categorySelect.value;
  if(!cat) { statusDiv.innerText = 'Please choose a category first.'; return; }
  let parsed;
  try {
    parsed = JSON.parse(text);
    if(!Array.isArray(parsed)) throw new Error('JSON must be an array');
  } catch(e){
    statusDiv.innerText = 'Invalid JSON: ' + e.message;
    return;
  }
  // Merge into pool (append). Keep unique ids by id or generate if missing.
  const pool = questionPools[cat] || [];
  // Normalize and validate
  parsed.forEach((q, idx) => {
    if(!q.id) q.id = `${cat}_${Date.now()}_${idx}`;
    if(!q.question || !q.options || !q.answer) {
      // skip invalid
      return;
    }
    pool.push(q);
  });
  questionPools[cat] = pool.slice(0, 200); // cap
  savePoolsToStorage();
  statusDiv.innerText = `Loaded ${parsed.length} items into ${cat}. Total now: ${questionPools[cat].length}`;
}

// ------------------- Start exam -------------------
startBtn.addEventListener('click', async () => {
  currentCategory = categorySelect.value;
  if(!currentCategory) { statusDiv.innerText = 'Select a category first.'; return; }
  const pool = questionPools[currentCategory] || [];
  if(pool.length < 50) {
    if(!confirm(`Category has only ${pool.length} questions. You need 70 to draw 50 random ones reliably. Continue with ${pool.length} questions?`)) return;
  }
  // choose random 50 (or pool.length)
  examQuestions = pickRandom(pool, Math.min(50, pool.length));
  // reset answers
  answers = {};
  currentIndex = 0;
  timeLeftSec = 30 * 60;
  warnCount = 0;
  warningsEl.innerText = warnCount;
  setupSection.classList.add('hidden');
  examSection.classList.remove('hidden');
  resultSection.classList.add('hidden');
  renderQuestion();
  startTimer();
  await startMediaDetection();
  // load face api models async
  initFaceApi();
});

function pickRandom(arr, k){
  const copy = arr.slice();
  const out = [];
  while(out.length < k && copy.length){
    const i = Math.floor(Math.random()*copy.length);
    out.push(copy.splice(i,1)[0]);
  }
  return out;
}

// ------------------- Timer -------------------
function startTimer(){
  updateTimerUI();
  if(timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeftSec--;
    updateTimerUI();
    if(timeLeftSec <= 0){
      clearInterval(timerInterval);
      autoSubmit('Time elapsed');
    }
  },1000);
}
function updateTimerUI(){
  const m = Math.floor(timeLeftSec/60).toString().padStart(2,'0');
  const s = (timeLeftSec%60).toString().padStart(2,'0');
  timerEl.innerText = `${m}:${s}`;
}

// ------------------- Render question -------------------
function renderQuestion(){
  const q = examQuestions[currentIndex];
  if(!q) return;
  questionArea.innerHTML = `
    <div class="question">Q${currentIndex+1}. ${escapeHtml(q.question)}</div>
    <div class="options">
      ${renderOption('A', q)}
      ${renderOption('B', q)}
      ${renderOption('C', q)}
      ${renderOption('D', q)}
    </div>
    <div style="margin-top:8px;"><small>Question ID: ${escapeHtml(q.id)}</small></div>
  `;
  // set selected if exists
  const sel = answers[q.id];
  if(sel){
    const el = document.querySelector(`[data-opt="${sel}"]`);
    if(el) el.classList.add('selected');
  }
  // add click handlers
  document.querySelectorAll('.option').forEach(el=>{
    el.addEventListener('click', ()=>{
      document.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));
      el.classList.add('selected');
      const opt = el.getAttribute('data-opt');
      answers[q.id] = opt;
    });
  });
}

function renderOption(opt, q){
  return `<div class="option" data-opt="${opt}">${opt}. ${escapeHtml(q.options?.[opt] || '')}</div>`;
}

function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

// ------------------- Navigation -------------------
prevBtn.addEventListener('click', ()=> {
  if(currentIndex>0){ currentIndex--; renderQuestion(); }
});
nextBtn.addEventListener('click', ()=> {
  if(currentIndex < examQuestions.length-1){ currentIndex++; renderQuestion(); }
});
submitBtn.addEventListener('click', ()=> {
  if(confirm('Submit exam now?')) autoSubmit('User submitted');
});

// ------------------- Results / scoring -------------------
function autoSubmit(reason){
  stopMediaDetection();
  if(timerInterval) clearInterval(timerInterval);
  // score
  let correct = 0;
  const missed = [];
  examQuestions.forEach(q=>{
    const ans = answers[q.id];
    if(ans && ans === q.answer) correct++;
    else {
      missed.push({ q, given: ans });
    }
  });
  const scorePercent = Math.round((correct / examQuestions.length) * 100);
  examSection.classList.add('hidden');
  resultSection.classList.remove('hidden');
  document.getElementById('score').innerHTML = `<p>Answered: ${Object.keys(answers).length}/${examQuestions.length}</p><p>Correct: ${correct}</p><p>Score: ${scorePercent}%</p><p><small>Auto-submit reason: ${escapeHtml(reason)}</small></p>`;
  renderMissed(missed);
}

function renderMissed(missed){
  const container = document.getElementById('missedList');
  if(!missed.length) { container.innerHTML = '<p>All correct. Well done!</p>'; return;}
  let html = '<ol>';
  missed.forEach(m=>{
    html += `<li><div style="font-weight:600">${escapeHtml(m.q.question)}</div>
      <div>Correct: <strong>${m.q.answer}. ${escapeHtml(m.q.options?.[m.q.answer]||'')}</strong></div>
      <div>Your answer: <em>${escapeHtml(m.given || 'No answer')}</em></div>
      ${m.q.explanation ? `<div><small>Explanation: ${escapeHtml(m.q.explanation)}</small></div>` : ''}
      <hr/>
    </li>`;
  });
  html += '</ol>';
  container.innerHTML = html;
}

restartBtn.addEventListener('click', ()=>{
  setupSection.classList.remove('hidden');
  examSection.classList.add('hidden');
  resultSection.classList.add('hidden');
  permText.innerText = 'Not asked';
  // stop streams
  stopMediaDetection();
});

// ------------------- Media: mic noise detection + face detection -------------------
async function startMediaDetection(){
  warnCount = 0;
  warningsEl.innerText = warnCount;
  try {
    // ask for both camera & mic in one call
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user', width: 640 } });
    permText.innerText = 'Permissions granted';
    // connect video
    const tracks = micStream.getVideoTracks();
    if(tracks.length) {
      video.srcObject = new MediaStream([tracks[0]]); // show camera
    }
    // audio
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    mediaStreamSource = audioContext.createMediaStreamSource(micStream);
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    mediaStreamSource.connect(analyser);

    // start periodic checks
    detectionInterval = setInterval(async () => {
      detectNoise();
      await detectFacesAndMovement();
    }, 900);

  } catch (e) {
    console.warn('media error', e);
    permText.innerText = 'Permissions denied or not available';
    statusDiv.innerText = 'Camera/microphone access is required for monitoring. The exam will still run but without monitoring.';
  }
}

function stopMediaDetection(){
  if(detectionInterval) clearInterval(detectionInterval);
  if(micStream){
    micStream.getTracks().forEach(t=>t.stop());
    micStream = null;
  }
  if(audioContext){
    try { audioContext.close(); } catch(e){}
    audioContext = null;
  }
  video.srcObject = null;
}

// noise detection
function detectNoise(){
  if(!analyser) return;
  const buf = new Float32Array(analyser.fftSize);
  analyser.getFloatTimeDomainData(buf);
  // compute RMS
  let sum = 0;
  for(let i=0;i<buf.length;i++){ sum += buf[i]*buf[i]; }
  const rms = Math.sqrt(sum / buf.length);
  // threshold: on mobile ambient level can vary. Tune as needed.
  const THRESH = 0.06; // conservative
  if(rms > THRESH){
    registerWarning('Noise detected');
  }
}

// face detection: simple approach - count faces present. Use face-api if loaded, else basic presence check.
let lastFaceCount = null;
let lastFaceTimestamp = 0;
async function detectFacesAndMovement(){
  if(!video || video.readyState < 2) return;
  // If face-api loaded, use tiny detector
  try {
    if(faceModelLoaded && faceapi && faceapi.nets && faceapi.nets.tinyFaceDetector){
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());
      const count = detections.length;
      // if no face or more than 1 face -> warning
      if(count === 0){
        registerWarning('Face not detected');
      } else if(count > 1){
        registerWarning('Multiple faces detected');
      } else {
        // single face: check movement - if face bounding box suddenly moves off-screen, count as movement.
        const box = detections[0].box;
        const centerX = box.x + box.width/2;
        const centerY = box.y + box.height/2;
        const now = Date.now();
        if(lastFaceCount === 1 && lastFaceTimestamp && (now - lastFaceTimestamp) < 1000){
          // movement heuristic: if center moved by big amount relative to video size
          // store previous center in lastCenter
          if(window.lastCenter){
            const dx = Math.abs(window.lastCenter.x - centerX);
            const dy = Math.abs(window.lastCenter.y - centerY);
            const move = Math.sqrt(dx*dx + dy*dy);
            // threshold relative to video width
            const MOVE_TH = (video.videoWidth || 640) * 0.12;
            if(move > MOVE_TH) registerWarning('Sudden movement detected');
          }
          window.lastCenter = { x: centerX, y: centerY };
        } else {
          window.lastCenter = { x: centerX, y: centerY };
        }
        lastFaceTimestamp = now;
      }
      lastFaceCount = count;
    } else {
      // fallback: basic heuristic using video pixel brightness (not reliable) - check if video has any frame (presence)
      // We'll skip fallback to avoid false positives
    }
  } catch(err){
    console.warn('face detect error', err);
  }
}

let recentWarnings = []; // to throttle repeated same warnings
function registerWarning(msg){
  // throttle identical warnings within short interval to avoid bursts
  const now = Date.now();
  // if same message in last 3s, ignore
  const lastSame = recentWarnings.find(r=>r.msg===msg);
  if(lastSame && (now - lastSame.ts) < 3000) return;
  recentWarnings.push({ msg, ts: now });
  // increment
  warnCount++;
  warningsEl.innerText = warnCount;
  // show quick message
  statusDiv.innerHTML = `<div class="warn">Warning ${warnCount}: ${escapeHtml(msg)}</div>`;
  if(warnCount >= 3){
    autoSubmit('3 warnings reached (' + msg + ')');
  }
}

// ------------------- Utilities -------------------
function downloadSampleJSON(){
  const sample = [
    { id: 'nis_1', question:'Which document is required to travel internationally?', options:{A:'National ID',B:'Passport',C:"Voter's Card",D:'Driver License'}, answer:'B', explanation:'Passport is required for international travel.' },
    { id: 'nis_2', question:'Sample Q2', options:{A:'a',B:'b',C:'c',D:'d'}, answer:'A' }
  ];
  const blob = new Blob([JSON.stringify(sample, null, 2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'sample_questions.json'; a.click();
  URL.revokeObjectURL(url);
}

// expose small helper so user can paste via console if needed
window._mockApp = {
  addPool: (cat, arr) => { questionPools[cat] = (questionPools[cat]||[]).concat(arr); savePoolsToStorage(); return questionPools[cat].length; }
};
