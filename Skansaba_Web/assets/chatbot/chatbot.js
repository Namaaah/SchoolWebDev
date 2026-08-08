/**
 * =============================================================================
 * CHATBOT ENGINE - SMKN 1 BANTUL
 * Menggunakan Google Gemini API + Knowledge Base lokal
 * =============================================================================
 */

(function () {
  'use strict';

  // ─── KONFIGURASI ────────────────────────────────────────────────────────────
  const CONFIG = {
    API_KEY: 'ollama',
    API_URL: 'http://localhost:11434/v1/chat/completions',
    MODEL: 'qwen2.5:1.5b',
    MAX_HISTORY: 12, // Berapa banyak percakapan yang diingat
    BOT_NAME: 'SABI',
    BOT_TAGLINE: 'Asisten Pintar SMKN 1 Bantul',
  };

  // ─── QUICK SUGGESTIONS ──────────────────────────────────────────────────────
  const SUGGESTIONS = [
    '📚 Jurusan apa saja?',
    '📍 Dimana lokasi sekolah?',
    '🕐 Jam masuk sekolah?',
    '📝 Cara daftar SPMB?',
    '🏆 Prestasi sekolah?',
  ];

  // ─── STATE ──────────────────────────────────────────────────────────────────
  let isOpen = false;
  let isTyping = false;
  let chatHistory = []; // Format: [{role: 'user'|'model', parts: [{text}]}]
  let welcomeShown = false;

  // ─── DOM ELEMENTS ───────────────────────────────────────────────────────────
  let fabEl, panelEl, messagesEl, inputEl, sendBtnEl, suggestionsEl;

  // ─── INIT ───────────────────────────────────────────────────────────────────
  function init() {
    injectHTML();
    injectCSS();
    bindElements();
    bindEvents();
    showWelcome();
  }

  function injectCSS() {
    if (document.getElementById('chatbot-css')) return;
    const link = document.createElement('link');
    link.id = 'chatbot-css';
    link.rel = 'stylesheet';
    link.href = 'assets/chatbot/chatbot.css';
    document.head.appendChild(link);
  }

  function injectHTML() {
    if (document.getElementById('chatbot-fab')) return;

    const html = `
      <!-- Floating Action Button -->
      <button class="chatbot-fab" id="chatbot-fab" aria-label="Buka Chatbot SABI" title="Tanya SABI - Asisten SMKN 1 Bantul">
        <i class="fa-solid fa-robot chatbot-fab-icon icon-bot"></i>
        <i class="fa-solid fa-xmark chatbot-fab-icon icon-close"></i>
        <span class="chatbot-fab-pulse" id="chatbot-pulse">1</span>
      </button>

      <!-- Chat Panel -->
      <div class="chatbot-panel" id="chatbot-panel" role="dialog" aria-label="Chatbot SABI" aria-modal="true">
        
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-avatar">
            <i class="fa-solid fa-robot"></i>
          </div>
          <div class="chatbot-header-info">
            <div class="chatbot-header-name">🤖 ${CONFIG.BOT_NAME}</div>
            <div class="chatbot-header-status">Online · Siap membantu</div>
          </div>
          <button class="chatbot-header-clear" id="chatbot-clear-btn" title="Hapus riwayat chat">
            <i class="fa-solid fa-rotate-right"></i> Reset
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" id="chatbot-messages" role="log" aria-live="polite"></div>

        <!-- Quick Suggestions -->
        <div class="chatbot-suggestions" id="chatbot-suggestions">
          ${SUGGESTIONS.map(s => `<button class="chatbot-suggestion-chip" type="button">${s}</button>`).join('')}
        </div>

        <!-- Input Area -->
        <div class="chatbot-input-area">
          <textarea
            class="chatbot-input"
            id="chatbot-input"
            placeholder="Tanyakan sesuatu tentang SMKN 1 Bantul..."
            rows="1"
            aria-label="Ketik pesan"
            maxlength="500"
          ></textarea>
          <button class="chatbot-send-btn" id="chatbot-send-btn" aria-label="Kirim pesan" disabled>
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
  }

  function bindElements() {
    fabEl = document.getElementById('chatbot-fab');
    panelEl = document.getElementById('chatbot-panel');
    messagesEl = document.getElementById('chatbot-messages');
    inputEl = document.getElementById('chatbot-input');
    sendBtnEl = document.getElementById('chatbot-send-btn');
    suggestionsEl = document.getElementById('chatbot-suggestions');
  }

  function bindEvents() {
    fabEl.addEventListener('click', togglePanel);

    sendBtnEl.addEventListener('click', handleSend);

    inputEl.addEventListener('input', () => {
      autoResizeTextarea(inputEl);
      sendBtnEl.disabled = inputEl.value.trim() === '' || isTyping;
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtnEl.disabled) handleSend();
      }
    });

    document.getElementById('chatbot-clear-btn').addEventListener('click', clearChat);

    suggestionsEl.querySelectorAll('.chatbot-suggestion-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.replace(/^\S+\s/, ''); // hapus emoji prefix
        sendMessage(text);
      });
    });

    // Tutup panel jika klik di luar
    document.addEventListener('click', (e) => {
      if (isOpen && !panelEl.contains(e.target) && !fabEl.contains(e.target)) {
        closePanel();
      }
    });

    // ESC untuk tutup
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) closePanel();
    });
  }

  // ─── PANEL CONTROLS ─────────────────────────────────────────────────────────
  function togglePanel() {
    isOpen ? closePanel() : openPanel();
  }

  function openPanel() {
    isOpen = true;
    panelEl.classList.add('open');
    fabEl.classList.add('open');
    inputEl.focus();
    scrollToBottom();
  }

  function closePanel() {
    isOpen = false;
    panelEl.classList.remove('open');
    fabEl.classList.remove('open');
  }

  // ─── WELCOME MESSAGE ────────────────────────────────────────────────────────
  function showWelcome() {
    if (welcomeShown) return;
    welcomeShown = true;

    const welcomeEl = document.createElement('div');
    welcomeEl.className = 'chatbot-welcome';
    welcomeEl.innerHTML = `
      <div class="chatbot-welcome-icon">🤖</div>
      <h3>Halo! Aku ${CONFIG.BOT_NAME}</h3>
      <p>${CONFIG.BOT_TAGLINE}. Tanya aku apa saja tentang SMKN 1 Bantul!</p>
    `;
    messagesEl.appendChild(welcomeEl);

    // Pesan pembuka dari bot
    setTimeout(() => {
      appendBotMessage('Halo! 👋 Aku **SABI**, asisten virtual SMKN 1 Bantul. Aku siap menjawab pertanyaanmu seputar sekolah — mulai dari jurusan, pendaftaran, fasilitas, hingga prestasi sekolah. Ada yang bisa aku bantu? 😊');
    }, 600);
  }

  // ─── CLEAR CHAT ─────────────────────────────────────────────────────────────
  function clearChat() {
    chatHistory = [];
    messagesEl.innerHTML = '';
    welcomeShown = false;
    showWelcome();
  }

  // ─── SEND MESSAGE ───────────────────────────────────────────────────────────
  function handleSend() {
    const text = inputEl.value.trim();
    if (!text || isTyping) return;
    sendMessage(text);
  }

  async function sendMessage(text) {
    if (!text || isTyping) return;

    // Reset input
    inputEl.value = '';
    inputEl.style.height = 'auto';
    sendBtnEl.disabled = true;

    // Sembunyikan suggestions setelah pertama kali kirim
    if (suggestionsEl) {
      suggestionsEl.style.display = 'none';
    }

    // Tampilkan pesan user
    appendUserMessage(text);

    // Tambahkan ke history
    chatHistory.push({ role: 'user', parts: [{ text }] });

    // Tampilkan indikator typing
    const typingEl = showTyping();
    isTyping = true;
    sendBtnEl.disabled = true;

    try {
      const reply = await callGeminiAPI(text);
      removeTyping(typingEl);
      appendBotMessage(reply);
      chatHistory.push({ role: 'model', parts: [{ text: reply }] });

      // Trim history jika terlalu panjang
      if (chatHistory.length > CONFIG.MAX_HISTORY * 2) {
        chatHistory = chatHistory.slice(-CONFIG.MAX_HISTORY * 2);
      }
    } catch (err) {
      removeTyping(typingEl);
      appendErrorMessage(err.message);
    } finally {
      isTyping = false;
      sendBtnEl.disabled = inputEl.value.trim() === '';
    }
  }

  // ─── NVIDIA API CALL (OpenAI-compatible) ────────────────────────────────────
  async function callGeminiAPI(userMessage) {
    // Ambil knowledge base dari global variable
    const knowledgeBase = (typeof SCHOOL_KNOWLEDGE !== 'undefined') ? SCHOOL_KNOWLEDGE : '';

    const systemPrompt = `Kamu adalah SABI (Sistem Asisten Berbasis Informasi), asisten virtual resmi SMK Negeri 1 Bantul, Yogyakarta.

TUGAS UTAMA:
- Menjawab pertanyaan seputar SMKN 1 Bantul dengan ramah, informatif, dan akurat.
- Menggunakan informasi dari knowledge base yang diberikan sebagai referensi utama.
- Menjawab dalam Bahasa Indonesia yang baik, santai, dan mudah dipahami oleh siswa atau calon siswa.

ATURAN PENTING:
1. HANYA jawab pertanyaan yang berkaitan dengan SMKN 1 Bantul, pendidikan, atau hal-hal yang relevan dengan sekolah.
2. Jika ditanya hal di luar konteks sekolah (politik, hiburan, gosip, dll), tolak dengan sopan dan arahkan kembali ke topik sekolah.
3. Gunakan knowledge base di bawah sebagai sumber utama jawaban.
4. Jika informasi tidak tersedia di knowledge base, jawab dengan jujur bahwa kamu tidak memiliki informasi tersebut dan sarankan menghubungi pihak sekolah langsung.
5. Jangan membuat informasi palsu atau mengarang data.
6. Gunakan emoji yang relevan secukupnya untuk membuat percakapan lebih hidup.
7. Jawaban tidak perlu terlalu panjang — ringkas, padat, dan informatif.
8. Untuk pertanyaan yang membutuhkan informasi terkini (seperti jadwal PPDB), selalu sarankan untuk mengecek website resmi atau menghubungi sekolah langsung.

KNOWLEDGE BASE SMKN 1 BANTUL:
${knowledgeBase}`;

    // Bangun messages array (format OpenAI)
    const messages = [{ role: 'system', content: systemPrompt }];

    // Tambahkan history percakapan sebelumnya (kecuali pesan terakhir)
    const prevHistory = chatHistory.slice(0, -1);
    prevHistory.forEach(msg => {
      // Konversi role Gemini -> OpenAI: 'model' -> 'assistant'
      messages.push({
        role: msg.role === 'model' ? 'assistant' : 'user',
        content: msg.parts[0].text
      });
    });

    // Tambahkan pesan user terbaru
    messages.push({ role: 'user', content: userMessage });

    const requestBody = {
      model: CONFIG.MODEL,
      messages: messages,
      temperature: 0.7,
      max_tokens: 600,
      top_p: 0.8,
      stream: false
    };

    const response = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CONFIG.API_KEY}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || errData.message || `HTTP Error ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) throw new Error('Tidak ada respons dari AI.');
    return text;
  }

  // ─── UI HELPERS ─────────────────────────────────────────────────────────────
  function appendUserMessage(text) {
    const time = getTime();
    const el = document.createElement('div');
    el.className = 'chat-msg user';
    el.innerHTML = `
      <div class="chat-msg-avatar"><i class="fa-solid fa-user"></i></div>
      <div>
        <div class="chat-msg-bubble">${escapeHTML(text)}</div>
        <span class="chat-msg-time">${time}</span>
      </div>
    `;
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function appendBotMessage(text) {
    const time = getTime();
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.innerHTML = `
      <div class="chat-msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div>
        <div class="chat-msg-bubble">${formatBotText(text)}</div>
        <span class="chat-msg-time">${time}</span>
      </div>
    `;
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function appendErrorMessage(msg) {
    const el = document.createElement('div');
    el.className = 'chat-msg bot';
    el.innerHTML = `
      <div class="chat-msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="chatbot-error-bubble">
        <i class="fa-solid fa-triangle-exclamation"></i>
        Maaf, terjadi kesalahan. Silakan coba lagi. <small>(${escapeHTML(msg)})</small>
      </div>
    `;
    messagesEl.appendChild(el);
    scrollToBottom();
  }

  function showTyping() {
    const el = document.createElement('div');
    el.className = 'chat-typing';
    el.id = 'chat-typing-indicator';
    el.innerHTML = `
      <div class="chat-msg-avatar"><i class="fa-solid fa-robot"></i></div>
      <div class="chat-typing-dots">
        <div class="chat-typing-dot"></div>
        <div class="chat-typing-dot"></div>
        <div class="chat-typing-dot"></div>
      </div>
    `;
    messagesEl.appendChild(el);
    scrollToBottom();
    return el;
  }

  function removeTyping(el) {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function autoResizeTextarea(el) {
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 110) + 'px';
  }

  function getTime() {
    return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHTML(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatBotText(text) {
    // Render markdown-like formatting
    return text
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:rgba(59,130,246,0.15);padding:2px 6px;border-radius:4px;font-size:12px;">$1</code>')
      .replace(/^[\s]*[-•]\s(.+)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/gs, '<ul style="padding-left:16px;margin:6px 0;">$1</ul>')
      .replace(/\n\n/g, '</p><p style="margin-top:8px;">')
      .replace(/\n/g, '<br>');
  }

  // ─── START ───────────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
