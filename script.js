/* script.js
  - One question per page
  - 30min timer
  - random 50/70 from pool
  - camera + mic detection (noise + movement)
  - beep on warning
  - auto-submit on 3 warnings
*/

(() => {
  // DOM
  const landing = document.getElementById('landing');
  const exam = document.getElementById('exam');
  const result = document.getElementById('result');
  const fallback = document.getElementById('fallback');
  const selectedWrap = document.getElementById('selectedWrap');
  const selectedText = document.getElementById('selectedText');
  const startNowBtn = document.getElementById('startNowBtn');
  const categoryButtons = Array.from(document.querySelectorAll('.cat-btn'));
  const examCategoryEl = document.getElementById('examCategory');
  const qIndicator = document.getElementById('qIndicator');
  const timerEl = document.getElementById('timer');
  const warnCountEl = document.getElementById('warnCount');
  const questionText = document.getElementById('questionText');
  const optionsList = document.getElementById('optionsList');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  const resultSummary = document.getElementById('resultSummary');
  const missedContainer = document.getElementById('missedContainer');
  const retakeBtn = document.getElementById('retakeBtn');

  // camera preview element
  const cameraPreview = document.createElement('div');
  cameraPreview.id = 'cameraPreview';
  cameraPreview.className = 'hidden';
  cameraPreview.innerHTML = '<video id="previewVideo" autoplay muted playsinline></video>';
  document.body.appendChild(cameraPreview);
  const previewVideo = document.getElementById('previewVideo');

  // state
  let chosenKey = null;
  let questionPool = []; // full pool from chosen category
  let examQuestions = []; // chosen 50 shuffled
  let answers = {}; // id -> answer letter
  let currentIndex = 0;
  let timerId = null;
  let timeLeft = 30 * 60; // seconds
  let warnCount = 0;

  // media
  let mediaStream = null;
  let audioCtx = null;
  let analyser = null;
  let faceModelLoaded = false;
  let detectionInterval = null;
  let recentWarnings = [];

  // beep generator
  function beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.value = 0.0001;
      o.connect(g);
      g.connect(ctx.destination);
      o.start();
      // ramp up fast then down
      g.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);
      g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
      setTimeout(()=>{ try{ o.stop(); ctx.close(); }catch(e){} }, 300);
    } catch(e){ console.warn('beep error', e); }
  }

  // util: show / hide
  function show(el){ el.classList.remove('hidden'); }
  function hide(el){ el.classList.add('hidden'); }

  // Category select handlers
  categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryButtons.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      chosenKey = btn.dataset.key;
      const label = btn.textContent.trim();
      selectedText.textContent = `Selected: ${label}`;
      show(selectedWrap);
      // animate start button
      startNowBtn.focus();
    });
  });

  // start exam button
  startNowBtn.addEventListener('click', async () => {
    if(!chosenKey) return alert('Choose a category first.');
    // map key to question variable
    switch(chosenKey){
      case 'nis':
        if(typeof NIS_QUESTIONS === 'undefined') return showFallback('NIS questions file not loaded.');
        questionPool = Array.isArray(NIS_QUESTIONS) ? NIS_QUESTIONS.slice() : [];
        break;
      case 'nfs':
        if(typeof FIRE_QUESTIONS === 'undefined') return showFallback('Fire Service questions file not loaded.');
        questionPool = Array.isArray(FIRE_QUESTIONS) ? FIRE_QUESTIONS.slice() : [];
        break;
      case 'nscdc':
        if(typeof CIVIL_DEFENCE_QUESTIONS === 'undefined') return showFallback('Civil Defence questions file not loaded.');
        questionPool = Array.isArray(CIVIL_DEFENCE_QUESTIONS) ? CIVIL_DEFENCE_QUESTIONS.slice() : [];
        break;
      case 'ncos':
        if(typeof CORRECTIONAL_QUESTIONS === 'undefined') return showFallback('Correctional questions file not loaded.');
        questionPool = Array.isArray(CORRECTIONAL_QUESTIONS) ? CORRECTIONAL_QUESTIONS.slice() : [];
        break;
      default:
        return showFallback('Unknown category.');
    }

    if(questionPool.length === 0) return showFallback('Question pool is empty for this category.');

    // pick random 50
    examQuestions = pickRandom(questionPool, Math.min(50, questionPool.length));
    answers = {};
    currentIndex = 0;
    timeLeft = 30 * 60;
    warnCount = 0;
    warnCountEl.textContent = warnCount;

    // UI switch
    hide(landing);
    hide(selectedWrap);
    hide(result);
    hide(fallback);
    show(exam);
    examCategoryEl.textContent = getCategoryLabel(chosenKey);
    renderQuestion();
    startTimer();
    await startMedia();
    loadFaceModelsAsync();
  });

  function showFallback(msg){
    document.getElementById('fallbackText').textContent = msg;
    hide(landing); hide(exam); hide(result);
    show(fallback);
  }

  // Helper: pick Random
  function pickRandom(arr, k){
    const copy = arr.slice();
    const out = [];
    while(out.length < k && copy.length){
      const i = Math.floor(Math.random()*copy.length);
      out.push(copy.splice(i,1)[0]);
    }
    return out;
  }

  function getCategoryLabel(key){
    if(key==='nis') return 'Nigeria Immigration Service';
    if(key==='nfs') return 'Nigeria Fire Service';
    if(key==='nscdc') return 'Nigeria Civil Defence Service';
    if(key==='ncos') return 'Nigeria Correctional Service';
    return 'Category';
  }

  // Render question
  function renderQuestion(){
    const q = examQuestions[currentIndex];
    if(!q) return;
    qIndicator.textContent = `Question ${currentIndex+1} of ${examQuestions.length}`;
    questionText.innerHTML = `<span>${escapeHtml(q.question)}</span>`;
    optionsList.innerHTML = '';
    const opts = q.options || {};
    ['A','B','C','D'].forEach(letter => {
      if(!opts[letter]) return;
      const el = document.createElement('div');
      el.className = 'option';
      el.dataset.opt = letter;
      el.innerHTML = `<strong>${letter}.</strong> ${escapeHtml(opts[letter])}`;
      if(answers[q.id] === letter) el.classList.add('selected');
      el.addEventListener('click', () => {
        // select
        Array.from(optionsList.children).forEach(c=>c.classList.remove('selected'));
        el.classList.add('selected');
        answers[q.id] = letter;
      });
      optionsList.appendChild(el);
    });

    // next/prev buttons show/hide
    prevBtn.disabled = currentIndex === 0;
    if(currentIndex === examQuestions.length - 1){
      hide(nextBtn);
      show(submitBtn);
    } else {
      show(nextBtn);
      hide(submitBtn);
    }
  }

  // nav buttons
  prevBtn.addEventListener('click', () => {
    if(currentIndex > 0){ currentIndex--; renderQuestion(); }
  });
  nextBtn.addEventListener('click', () => {
    if(currentIndex < examQuestions.length - 1){ currentIndex++; renderQuestion(); }
  });
  submitBtn.addEventListener('click', () => {
    if(confirm('Submit exam now?')) finishExam('User submitted');
  });

  // Timer
  function startTimer(){
    updateTimerUI();
    if(timerId) clearInterval(timerId);
    timerId = setInterval(()=>{
      timeLeft--;
      updateTimerUI();
      if(timeLeft <= 0){
        clearInterval(timerId);
        finishExam('Time elapsed');
      }
    },1000);
  }

  function updateTimerUI(){
    const m = Math.floor(timeLeft/60).toString().padStart(2,'0');
    const s = (timeLeft%60).toString().padStart(2,'0');
    timerEl.textContent = `${m}:${s}`;
  }

  // finish exam: scoring + results
  function finishExam(reason){
    stopMedia();
    if(timerId) clearInterval(timerId);
    // scoring
    let correct = 0;
    const missed = [];
    examQuestions.forEach(q=>{
      const ans = answers[q.id];
      if(ans && ans === q.answer) correct++;
      else missed.push({ q, given: ans || null });
    });
    const percent = Math.round((correct / examQuestions.length) * 100);
    resultSummary.innerHTML = `<div>Answered: ${Object.keys(answers).length}/${examQuestions.length}</div>
      <div>Correct: ${correct}</div><div>Score: ${percent}%</div>
      <div style="margin-top:6px;color:var(--muted);font-size:13px;">Auto-submit reason: ${escapeHtml(reason)}</div>`;

    // missed list
    if(missed.length === 0){
      missedContainer.innerHTML = `<p>All correct — excellent!</p>`;
    } else {
      const ol = document.createElement('ol');
      missed.forEach(m=>{
        const li = document.createElement('li');
        li.style.marginBottom = '10px';
        li.innerHTML = `<div style="font-weight:700">${escapeHtml(m.q.question)}</div>
          <div>Correct: <strong>${m.q.answer}. ${escapeHtml(m.q.options?.[m.q.answer] || '')}</strong></div>
          <div>Your answer: <em>${escapeHtml(m.given || 'No answer')}</em></div>
          ${m.q.explanation ? `<div style="color:var(--muted);font-size:13px;">Explanation: ${escapeHtml(m.q.explanation)}</div>` : ''}`;
        ol.appendChild(li);
      });
      missedContainer.innerHTML = '';
      missedContainer.appendChild(ol);
    }

    // UI
    hide(exam);
    show(result);
  }

  retakeBtn.addEventListener('click', () => {
    // reset
    hide(result); show(landing); show(selectedWrap);
    // stop streams if any
    stopMedia();
  });

  // ------------------------
  // Media: camera + mic detection
  // ------------------------
  async function startMedia(){
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user' } });
      // show preview
      previewVideo.srcObject = new MediaStream([mediaStream.getVideoTracks()[0]]);
      show(cameraPreview);

      // audio analysis
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const source = audioCtx.createMediaStreamSource(mediaStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);

      // detection loop
      detectionInterval = setInterval(async () => {
        detectNoise();
        await detectFaceAndMovement();
      }, 900);
    } catch (e){
      console.warn('Media start failed', e);
      alert('Camera & microphone access denied or unavailable. Monitoring will be disabled, but you can still take the test.');
    }
  }

  function stopMedia(){
    if(detectionInterval) clearInterval(detectionInterval);
    if(mediaStream){
      mediaStream.getTracks().forEach(t=>t.stop());
      mediaStream = null;
    }
    if(audioCtx){
      try { audioCtx.close(); } catch(e){}
      audioCtx = null;
    }
    if(previewVideo) previewVideo.srcObject = null;
    hide(cameraPreview);
  }

  // noise detection via RMS
  function detectNoise(){
    if(!analyser) return;
    const buf = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(buf);
    let sum = 0;
    for(let i=0;i<buf.length;i++) sum += buf[i]*buf[i];
    const rms = Math.sqrt(sum / buf.length);
    const THRESH = 0.06; // tweakable
    if(rms > THRESH) registerWarning('Noise detected');
  }

  // face detection using face-api.js (tiny face detector)
  async function loadFaceModelsAsync(){
    try {
      // loads from CDN weights path
      await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/');
      faceModelLoaded = true;
    } catch(e){
      console.warn('face model load failed', e);
    }
  }

  let lastCenter = null;
  async function detectFaceAndMovement(){
    if(!previewVideo || previewVideo.readyState < 2) return;
    if(!faceModelLoaded) return; // skip until model ready
    try {
      const results = await faceapi.detectAllFaces(previewVideo, new faceapi.TinyFaceDetectorOptions());
      const count = results.length;
      if(count === 0) {
        registerWarning('Face not detected');
      } else if(count > 1) {
        registerWarning('Multiple faces detected');
      } else {
        const box = results[0].box;
        const center = { x: box.x + box.width/2, y: box.y + box.height/2 };
        if(lastCenter){
          const dx = Math.abs(center.x - lastCenter.x);
          const dy = Math.abs(center.y - lastCenter.y);
          const move = Math.sqrt(dx*dx + dy*dy);
          const moveThreshold = (previewVideo.videoWidth || 320) * 0.14;
          if(move > moveThreshold) registerWarning('Sudden movement detected');
        }
        lastCenter = center;
      }
    } catch(e){
      console.warn('face detection error', e);
    }
  }

  // register warning (throttled)
  function registerWarning(msg){
    const now = Date.now();
    // throttle same message
    const previous = recentWarnings.find(r => r.msg === msg);
    if(previous && (now - previous.ts) < 3500) return;
    recentWarnings.push({ msg, ts: now });

    warnCount++;
    warnCountEl.textContent = warnCount;
    // show temporary alert
    alertSmall(msg + ' — warning ' + warnCount + '/3');
    beep();

    if(warnCount >= 3){
      finishExam('3 warnings reached (' + msg + ')');
    }
  }

  function alertSmall(text){
    // small non-blocking overlay for short time
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '18px';
    el.style.transform = 'translateX(-50%)';
    el.style.background = 'linear-gradient(90deg,#ff8a8a,#ff5252)';
    el.style.color = '#012';
    el.style.padding = '8px 14px';
    el.style.borderRadius = '8px';
    el.style.fontWeight = '700';
    el.style.zIndex = '99999';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(()=>{ el.remove(); }, 2200);
  }

  // small helpers
  function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // click outside camera preview to toggle visibility (optional)
  cameraPreview.addEventListener('click', ()=> {
    cameraPreview.classList.toggle('hidden');
  });

  // basic keyboard handlers for convenience (Next = right arrow)
  document.addEventListener('keydown', (e)=>{
    if(exam.classList.contains('hidden')) return;
    if(e.key === 'ArrowRight') nextBtn.click();
    if(e.key === 'ArrowLeft') prevBtn.click();
  });

  // end
})();// Media detection
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
