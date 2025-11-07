/* Updated script.js
   - Start button appears inside selected card
   - Responsive 2x2 / stacked layout
   - Loads 50 random questions from chosen file (NIS present)
   - One question per page, timer, warnings, auto-submit
*/

(() => {
  // DOM refs
  const catCards = Array.from(document.querySelectorAll('.cat-card'));
  const landing = document.getElementById('landing');
  const exam = document.getElementById('exam');
  const result = document.getElementById('result');
  const fallback = document.getElementById('fallback');
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

  // camera preview
  const cameraPreview = document.getElementById('cameraPreview');
  const previewVideo = document.getElementById('previewVideo');

  // state
  let activeCard = null;
  let chosenKey = null;
  let questionPool = [];
  let examQuestions = [];
  let answers = {};
  let currentIndex = 0;
  let timeLeft = 30 * 60;
  let timerId = null;
  let warnCount = 0;

  // media
  let mediaStream = null;
  let audioCtx = null;
  let analyser = null;
  let detectionInterval = null;
  let recentWarnings = [];

  // beep
  function beep(){
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'sine';
      o.frequency.value = 880;
      g.gain.value = 0.0001;
      o.connect(g); g.connect(ctx.destination);
      o.start();
      g.gain.linearRampToValueAtTime(0.16, ctx.currentTime + 0.01);
      g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
      setTimeout(()=>{ try{o.stop(); ctx.close();}catch(e){} }, 300);
    } catch(e){ console.warn('beep', e); }
  }

  // helpers
  function show(el){ el.classList.remove('hidden'); }
  function hide(el){ el.classList.add('hidden'); }
  function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

  // wire category cards: select button shows start inside that card
  catCards.forEach(card => {
    const selectBtn = card.querySelector('.select-btn');
    const startBtn = card.querySelector('.start-btn');

    selectBtn.addEventListener('click', () => {
      // clear previous
      catCards.forEach(c => {
        c.classList.remove('active');
        c.querySelector('.start-btn').classList.add('hidden');
      });

      card.classList.add('active');
      startBtn.classList.remove('hidden');
      activeCard = card;
      chosenKey = card.dataset.key;
      // small scroll into view on mobile
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    startBtn.addEventListener('click', async () => {
      // start exam flow
      if(!chosenKey) return alert('Choose a category first.');
      // load pool variable based on key
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
      // choose 50 at random
      examQuestions = pickRandom(questionPool, Math.min(50, questionPool.length));
      answers = {};
      currentIndex = 0;
      timeLeft = 30 * 60;
      warnCount = 0;
      warnCountEl.textContent = warnCount;

      // UI
      hide(landing);
      hide(result);
      hide(fallback);
      show(exam);
      examCategoryEl.textContent = activeCard.querySelector('.cat-title').textContent;
      renderQuestion();
      startTimer();
      await startMedia();
      loadFaceModels();
    });
  });

  function showFallback(msg){
    document.getElementById('fallbackText').textContent = msg;
    hide(landing); hide(exam); hide(result);
    show(fallback);
  }

  // pick random
  function pickRandom(arr,k){
    const c = arr.slice();
    const out = [];
    while(out.length < k && c.length){
      const i = Math.floor(Math.random()*c.length);
      out.push(c.splice(i,1)[0]);
    }
    return out;
  }

  // render
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
      el.addEventListener('click', ()=> {
        Array.from(optionsList.children).forEach(c=>c.classList.remove('selected'));
        el.classList.add('selected');
        answers[q.id] = letter;
      });
      optionsList.appendChild(el);
    });

    prevBtn.disabled = currentIndex === 0;
    if(currentIndex === examQuestions.length - 1){
      hide(nextBtn); show(submitBtn);
    } else {
      show(nextBtn); hide(submitBtn);
    }
  }

  // nav
  prevBtn.addEventListener('click', ()=> { if(currentIndex>0){ currentIndex--; renderQuestion(); } });
  nextBtn.addEventListener('click', ()=> { if(currentIndex < examQuestions.length-1){ currentIndex++; renderQuestion(); } });
  submitBtn.addEventListener('click', ()=> { if(confirm('Submit exam now?')) finishExam('User submitted'); });

  // timer
  function startTimer(){
    updateTimer();
    if(timerId) clearInterval(timerId);
    timerId = setInterval(()=> {
      timeLeft--;
      updateTimer();
      if(timeLeft <= 0){ clearInterval(timerId); finishExam('Time elapsed'); }
    },1000);
  }
  function updateTimer(){
    const m = Math.floor(timeLeft/60).toString().padStart(2,'0');
    const s = (timeLeft%60).toString().padStart(2,'0');
    timerEl.textContent = `${m}:${s}`;
  }

  // finish exam
  function finishExam(reason){
    stopMedia();
    if(timerId) clearInterval(timerId);
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

    hide(exam); show(result);
  }

  retakeBtn.addEventListener('click', ()=> {
    hide(result); show(landing);
    // reset UI
    catCards.forEach(c => { c.classList.remove('active'); c.querySelector('.start-btn').classList.add('hidden'); });
    stopMedia();
  });

  // -------------------------
  // Media detection
  // -------------------------
  async function startMedia(){
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: { facingMode: 'user' } });
      // show preview
      if(mediaStream.getVideoTracks().length){
        previewVideo.srcObject = new MediaStream([mediaStream.getVideoTracks()[0]]);
        show(cameraPreview);
      }
      // audio
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const src = audioCtx.createMediaStreamSource(mediaStream);
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 2048;
      src.connect(analyser);

      detectionInterval = setInterval(async ()=> {
        detectNoise();
        await detectFaces();
      }, 900);
    } catch(e){
      console.warn('media failed', e);
      alert('Camera & microphone access denied. Monitoring disabled but you can still take the test.');
    }
  }

  function stopMedia(){
    if(detectionInterval) clearInterval(detectionInterval);
    if(mediaStream){
      mediaStream.getTracks().forEach(t=>t.stop());
      mediaStream = null;
    }
    if(audioCtx){ try{ audioCtx.close(); }catch(e){} audioCtx = null; }
    previewVideo.srcObject = null;
    hide(cameraPreview);
  }

  // noise detection (RMS)
  function detectNoise(){
    if(!analyser) return;
    const buf = new Float32Array(analyser.fftSize);
    analyser.getFloatTimeDomainData(buf);
    let sum = 0;
    for(let i=0;i<buf.length;i++) sum += buf[i]*buf[i];
    const rms = Math.sqrt(sum / buf.length);
    const TH = 0.06; // tweakable
    if(rms > TH) registerWarning('Noise detected');
  }

  // face-api
  let faceModelLoaded = false;
  async function loadFaceModels(){
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights/');
      faceModelLoaded = true;
    } catch(e){ console.warn('face model load failed', e); }
  }

  let lastCenter = null;
  async function detectFaces(){
    if(!faceModelLoaded) return;
    if(!previewVideo || previewVideo.readyState < 2) return;
    try {
      const res = await faceapi.detectAllFaces(previewVideo, new faceapi.TinyFaceDetectorOptions());
      const count = res.length;
      if(count === 0) registerWarning('Face not detected');
      else if(count > 1) registerWarning('Multiple faces detected');
      else {
        const box = res[0].box;
        const center = { x: box.x + box.width/2, y: box.y + box.height/2 };
        if(lastCenter){
          const dx = Math.abs(center.x - lastCenter.x);
          const dy = Math.abs(center.y - lastCenter.y);
          const move = Math.sqrt(dx*dx + dy*dy);
          const MOVE_TH = (previewVideo.videoWidth || 320) * 0.14;
          if(move > MOVE_TH) registerWarning('Sudden movement detected');
        }
        lastCenter = center;
      }
    } catch(e){ console.warn('face detect error', e); }
  }

  // warning register (throttled)
  function registerWarning(msg){
    const now = Date.now();
    const prev = recentWarnings.find(r => r.msg === msg);
    if(prev && (now - prev.ts) < 3500) return;
    recentWarnings.push({ msg, ts: now });

    warnCount++;
    warnCountEl.textContent = warnCount;
    showInlineWarning(`${msg} — warning ${warnCount}/3`);
    beep();

    if(warnCount >= 3) {
      finishExam('3 warnings reached (' + msg + ')');
    }
  }

  function showInlineWarning(text){
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.left = '50%';
    el.style.top = '16px';
    el.style.transform = 'translateX(-50%)';
    el.style.background = 'linear-gradient(90deg,#ff8a8a,#ff5252)';
    el.style.color = '#021018';
    el.style.padding = '8px 12px';
    el.style.borderRadius = '8px';
    el.style.fontWeight = '700';
    el.style.zIndex = '99999';
    el.textContent = text;
    document.body.appendChild(el);
    setTimeout(()=> el.remove(), 2000);
  }

  // clicking camera preview toggles hide/show
  cameraPreview.addEventListener('click', ()=> cameraPreview.classList.toggle('hidden'));

  // keyboard nav
  document.addEventListener('keydown', (e)=>{
    if(exam.classList.contains('hidden')) return;
    if(e.key === 'ArrowRight') nextBtn.click();
    if(e.key === 'ArrowLeft') prevBtn.click();
  });

})();
