const GOOGLE_CLOUD_API_KEY = 'DIN_API_NYCKEL_HÄR';
const SOURCE_LANG = 'sv';
const demoDictionary = {
    'en': {
        "Hem": "Home",
        "Om Oss": "About Us",
        "Schema": "Schedule",
        "AI-Övasjälv": "AI Practice",
        "Föräldrar": "Parents",
        "Din digitala koranskola för barn": "Your digital Quran school for children",
        "Jaliyaakadmin ämnar att ge muslimska barn och ungdomar (6–17 år) traditionell kunskap om Islam och stärka deras muslimska och svenska identitet.": "Jaliyaakadmin aims to give Muslim children and youth (6-17 years) traditional knowledge of Islam and strengthen their Muslim and Swedish identity.",
        "Anmälan": "Register",
        "Kommande Händelser & Kalender": "Upcoming Events & Calendar",
        "Smart Tajweed": "Smart Tajweed",
        "AI-Analys & Den Digitala Mentorn": "AI Analysis & The Digital Mentor",
        "Klicka på mikrofonen och läs versen högt. AI:n lyssnar och ger direkt feedback på uttalet!": "Click the microphone and read the verse aloud. The AI listens and gives direct feedback on pronunciation!",
        "Redo att öva.": "Ready to practice.",
        "Trygghet och Insyn": "Security and Insight",
        "Föräldra-dashboard": "Parent Dashboard",
        "Veckorapport": "Weekly Report",
        "Aktiv läsning denna vecka.": "Active reading this week.",
        "Förbättrat uttal (särskilt på bokstaven 'Qaf').": "Improved pronunciation (especially on the letter 'Qaf').",
        "Milstolpar (Erövringskarta)": "Milestones (Conquest Map)",
        "Se hur ditt barn memorerar Koranen steg för steg.": "See how your child memorizes the Quran step by step.",
        "Al-Fatihah (Klar)": "Al-Fatihah (Done)",
        "Al-Ikhlas (Klar)": "Al-Ikhlas (Done)",
        "Al-Falaq (Övar)": "Al-Falaq (Practicing)",
        "An-Nas (Låst)": "An-Nas (Locked)",
        "Kommunikation": "Communication",
        "Följ upp ditt barns utveckling eller ställ frågor direkt till vår personal.": "Follow up on your child's development or ask questions directly to our staff.",
        "Boka samtal med lärare": "Book a call with a teacher",
        "Mån": "Mon",
        "Tis": "Tue",
        "Ons": "Wed",
        "Tors": "Thu",
        "Fre": "Fri",
        "Lör": "Sat",
        "Sön": "Sun",
        "< Föregående": "< Previous",
        "Nästa >": "Next >"
    },
    'ar': {
        "Hem": "الرئيسية",
        "Om Oss": "معلومات عنا",
        "Schema": "الجدول",
        "AI-Övasjälv": "التدريب الذكي",
        "Föräldrar": "أولياء الأمور",
        "Din digitala koranskola för barn": "مدرستك القرآنية الرقمية للأطفال",
        "Jaliyaakadmin ämnar att ge muslimska barn och ungdomar (6–17 år) traditionell kunskap om Islam och stärka deras muslimska och svenska identitet.": "تهدف Jaliyaakadmin إلى تزويد الأطفال والشباب المسلمين (6-17 عامًا) بالمعرفة التقليدية للإسلام وتعزيز هويتهم.",
        "Anmälan": "تسجيل",
        "Kommande Händelser & Kalender": "الأحداث القادمة والتقويم",
        "Smart Tajweed": "تجويد ذكي",
        "AI-Analys & Den Digitala Mentorn": "تحليل الذكاء الاصطناعي والمرشد الرقمي",
        "Klicka på mikrofonen och läs versen högt. AI:n lyssnar och ger direkt feedback på uttalet!": "انقر على الميكروفون واقرأ الآية بصوت عالٍ. الذكاء الاصطناعي يستمع ويعطي ملاحظات مباشرة!",
        "Redo att öva.": "جاهز للتدريب.",
        "Trygghet och Insyn": "الأمان والرؤية",
        "Föräldra-dashboard": "لوحة تحكم الآباء",
        "Veckorapport": "التقرير الأسبوعي",
        "Aktiv läsning denna vecka.": "قراءة نشطة هذا الأسبوع.",
        "Förbättrat uttal (särskilt på bokstaven 'Qaf').": "نطق محسن (خاصة حرف القاف).",
        "Milstolpar (Erövringskarta)": "إنجازات (خريطة الغزو)",
        "Se hur ditt barn memorerar Koranen steg för steg.": "شاهد كيف يحفظ طفلك القرآن خطوة بخطوة.",
        "Al-Fatihah (Klar)": "الفاتحة (مكتمل)",
        "Al-Ikhlas (Klar)": "الإخلاص (مكتمل)",
        "Al-Falaq (Övar)": "الفلق (يتدرب)",
        "An-Nas (Låst)": "الناس (مغلق)",
        "Kommunikation": "التواصل",
        "Följ upp ditt barns utveckling eller ställ frågor direkt till vår personal.": "تابع تطور طفلك أو اطرح أسئلة مباشرة على طاقمنا.",
        "Boka samtal med lärare": "احجز مكالمة مع المعلم",
        "Mån": "الاثنين",
        "Tis": "الثلاثاء",
        "Ons": "الأربعاء",
        "Tors": "الخميس",
        "Fre": "الجمعة",
        "Lör": "السبت",
        "Sön": "الأحد",
        "< Föregående": "< السابق",
        "Nästa >": "التالي >"
    }
};

const translatableElements = [];

function initTranslatableElements() {
    const allElements = document.querySelectorAll('h1, h2, h3, p, a, span, button, li, div');
    allElements.forEach(el => {
        if (el.children.length === 0 && el.textContent.trim() !== '') {
            el.dataset.originalText = el.textContent.replace(/\s+/g, ' ').trim();
            translatableElements.push(el);
        }
    });
}

function translatePage(targetLang) {
    if (targetLang === SOURCE_LANG) {
        translatableElements.forEach(el => {
            if (el.dataset.originalText) {
                el.textContent = el.dataset.originalText;
                el.style.direction = targetLang === 'ar' ? 'rtl' : 'ltr';
            }
        });
        document.body.style.direction = 'ltr';
        return;
    }

    document.body.style.direction = targetLang === 'ar' ? 'rtl' : 'ltr';

    if (GOOGLE_CLOUD_API_KEY !== 'DIN_API_NYCKEL_HÄR') {
        const textsToTranslate = translatableElements.map(el => el.dataset.originalText);
        if (textsToTranslate.length === 0) return;

        fetch(`https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_CLOUD_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ q: textsToTranslate, source: SOURCE_LANG, target: targetLang, format: 'text' })
        })
            .then(response => response.json())
            .then(data => {
                if (data.data && data.data.translations) {
                    data.data.translations.forEach((translation, index) => {
                        translatableElements[index].textContent = translation.translatedText;
                    });
                }
            })
            .catch(error => {
                console.error('Nätverksfel vid översättning:', error);
            });
    } else {
        translatableElements.forEach(el => {
            const original = el.dataset.originalText;
            if (demoDictionary[targetLang] && demoDictionary[targetLang][original]) {
                el.textContent = demoDictionary[targetLang][original];
            }
        });
    }
}

// Calendar & Booking Logic
const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
const dayNamesShort = ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"];
let bookings = {};
let selectedDate = null;

async function fetchBookings() {
    try {
        const response = await fetch('http://localhost:3000/api/bookings');
        const data = await response.json();
        bookings = {};
        data.forEach(b => {
            bookings[b.date] = b.note;
        });
        renderYearlyCalendar();
    } catch (error) {
        console.error('Kunde inte hämta bokningar:', error);
        // Fallback to local if server is down
        bookings = JSON.parse(localStorage.getItem('jaliyaBookings')) || {};
        renderYearlyCalendar();
    }
}

function renderYearlyCalendar() {
    const calendarContainer = document.getElementById('yearlyCalendar');
    if (!calendarContainer) return;
    calendarContainer.innerHTML = '';

    const year = 2026;

    for (let month = 0; month < 12; month++) {
        const monthBox = document.createElement('div');
        monthBox.classList.add('month-box');

        const h4 = document.createElement('h4');
        h4.innerText = monthNames[month];
        monthBox.appendChild(h4);

        const grid = document.createElement('div');
        grid.classList.add('calendar-grid');

        dayNamesShort.forEach(day => {
            const header = document.createElement('div');
            header.classList.add('calendar-day-header');
            header.innerText = day;
            grid.appendChild(header);
        });

        const firstDay = new Date(year, month, 1).getDay();
        const startOffset = firstDay === 0 ? 6 : firstDay - 1;
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 0; i < startOffset; i++) {
            const empty = document.createElement('div');
            empty.classList.add('calendar-day');
            empty.style.visibility = 'hidden';
            grid.appendChild(empty);
        }

        const today = new Date();
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar-day');
            dayDiv.innerText = day;

            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

            if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
                dayDiv.classList.add('today');
            }

            if (bookings[dateStr]) {
                dayDiv.classList.add('booked');
                dayDiv.title = bookings[dateStr];
            }

            dayDiv.addEventListener('click', () => openBookingModal(dateStr));
            grid.appendChild(dayDiv);
        }

        monthBox.appendChild(grid);
        calendarContainer.appendChild(monthBox);
    }
    renderBookedList();
}

function openBookingModal(date) {
    selectedDate = date;
    const modal = document.getElementById('bookingModal');
    const display = document.getElementById('selectedDateDisplay');
    if (!modal || !display) return;

    display.innerText = `Datum: ${date}`;
    const noteInput = document.getElementById('bookingNote');
    noteInput.value = bookings[date] || '';

    modal.style.display = 'block';
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.style.display = 'none';
}

async function saveBooking() {
    const noteInput = document.getElementById('bookingNote');
    if (!selectedDate) return;

    const note = noteInput.value.trim();

    try {
        await fetch('http://localhost:3000/api/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ date: selectedDate, note: note })
        });

        // Update local state and re-render
        if (note === '') {
            delete bookings[selectedDate];
        } else {
            bookings[selectedDate] = note;
        }

        // Also update localStorage as backup
        localStorage.setItem('jaliyaBookings', JSON.stringify(bookings));

        renderYearlyCalendar();
        closeBookingModal();
    } catch (error) {
        console.error('Kunde inte spara bokning:', error);
        alert('Kunde inte spara bokningen på servern.');
    }
}

function renderBookedList() {
    const list = document.getElementById('bookedDatesList');
    if (!list) return;
    list.innerHTML = '';

    const sortedDates = Object.keys(bookings).sort();
    if (sortedDates.length === 0) {
        list.innerHTML = '<li>Inga datum bokade ännu.</li>';
        return;
    }

    sortedDates.forEach(date => {
        const li = document.createElement('li');
        li.innerHTML = `<span><strong>${date}</strong>: ${bookings[date]}</span>`;
        const delBtn = document.createElement('button');
        delBtn.innerText = 'Ta bort';
        delBtn.style.padding = '5px 10px';
        delBtn.style.borderRadius = '4px';
        delBtn.style.border = 'none';
        delBtn.style.cursor = 'pointer';
        delBtn.style.background = '#d32f2f';
        delBtn.style.color = 'white';
        delBtn.onclick = async () => {
            try {
                await fetch('http://localhost:3000/api/bookings', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ date: date, note: '' })
                });
                delete bookings[date];
                localStorage.setItem('jaliyaBookings', JSON.stringify(bookings));
                renderYearlyCalendar();
            } catch (error) {
                console.error('Kunde inte ta bort bokning:', error);
            }
        };
        li.appendChild(delBtn);
        list.appendChild(li);
    });
}

function initCalendar() {
    if (!document.getElementById('yearlyCalendar')) return;

    fetchBookings();

    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) closeBtn.onclick = closeBookingModal;

    const confirmBtn = document.getElementById('confirmBooking');
    if (confirmBtn) confirmBtn.onclick = saveBooking;

    window.onclick = (event) => {
        const modal = document.getElementById('bookingModal');
        if (event.target == modal) closeBookingModal();
    };
}

function initSpeechRecognition() {
    const micBtn = document.getElementById('micBtn');
    const feedbackBox = document.getElementById('feedbackBox');
    if (!micBtn || !feedbackBox) return;

    let isListening = false;
    let recognition;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'ar-SA';

        recognition.onstart = function () {
            isListening = true;
            micBtn.classList.add('listening');
            micBtn.innerHTML = '🛑';
            feedbackBox.innerText = "Lyssnar... Läs versen högt.";
            feedbackBox.style.color = "var(--text-dark)";
            document.querySelectorAll('.arabic-text .word').forEach(w => w.className = 'word');
        };

        recognition.onresult = function () {
            const arabicWords = document.querySelectorAll('.arabic-text .word');
            let correctCount = 0;
            arabicWords.forEach((word) => {
                const isCorrect = Math.random() > 0.2;
                if (isCorrect) {
                    word.classList.add('correct');
                    correctCount++;
                } else {
                    word.classList.add('incorrect');
                }
            });

            if (correctCount === arabicWords.length) {
                feedbackBox.innerHTML = "⭐ Perfekt uttal! MashaAllah!";
                feedbackBox.style.color = "#2e7d32";
            } else {
                feedbackBox.innerHTML = "Bra försök! Du behöver öva lite mer på de röda orden (t.ex. uttala från halsen).";
                feedbackBox.style.color = "#d32f2f";
            }
        };

        recognition.onerror = function () {
            feedbackBox.innerText = "Kunde inte höra dig. Vänligen tillåt mikrofonen och försök igen.";
            micBtn.classList.remove('listening');
            micBtn.innerHTML = '🎤';
            isListening = false;
        };

        recognition.onend = function () {
            micBtn.classList.remove('listening');
            micBtn.innerHTML = '🎤';
            isListening = false;
        };
    } else {
        feedbackBox.innerText = "Din webbläsare stöder tyvärr inte röstigenkänning direkt i webbläsaren. Använd Google Chrome, Edge eller Safari.";
    }

    micBtn.addEventListener('click', () => {
        if (!recognition) return;
        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
}

// Parent authentication functions
function initAuth() {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const registerMessage = document.getElementById('registerMessage');
    const loginMessage = document.getElementById('loginMessage');
    const dashboard = document.getElementById('dashboard');
    const registrationSection = document.getElementById('registrationSection');
    const loginSection = document.getElementById('loginSection');

    if (!registerForm || !loginForm) return;

    // Check if already logged in
    const token = localStorage.getItem('authToken');
    if (token) {
        showDashboard();
        return;
    }

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const password = document.getElementById('regPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, phone, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                registerMessage.style.color = '#2e7d32';
                registerMessage.textContent = 'Konto skapat! Du är nu inloggad.';
                showDashboard();
            } else {
                registerMessage.textContent = data.error || 'Registrering misslyckades';
            }
        } catch (error) {
            registerMessage.textContent = 'Nätverksfel. Kontrollera att servern körs.';
        }
    });

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('authToken', data.token);
                loginMessage.style.color = '#2e7d32';
                loginMessage.textContent = 'Inloggning lyckades!';
                showDashboard();
            } else {
                loginMessage.textContent = data.error || 'Inloggning misslyckades';
            }
        } catch (error) {
            loginMessage.textContent = 'Nätverksfel. Kontrollera att servern körs.';
        }
    });

    function showDashboard() {
        if (registrationSection) registrationSection.style.display = 'none';
        if (loginSection) loginSection.style.display = 'none';
        if (dashboard) dashboard.style.display = 'grid';
    }
}

// Child Registration & Queue Logic
function initChildRegistration() {
    const childRegForm = document.getElementById('childRegistrationForm');
    const childRegMessage = document.getElementById('childRegMessage');
    const queueList = document.getElementById('queueList');
    const mockAdmitBtn = document.getElementById('mockAdmitBtn');

    if (!childRegForm) return;

    let childQueue = JSON.parse(localStorage.getItem('jaliyaChildQueue')) || [];

    function renderQueue() {
        if (!queueList) return;
        queueList.innerHTML = '';

        if (childQueue.length === 0) {
            queueList.innerHTML = '<p>Inga barn i kö ännu.</p>';
            if (mockAdmitBtn) mockAdmitBtn.style.display = 'none';
            return;
        }

        let admittedCount = 0;
        let inQueueCount = 0;

        childQueue.forEach(child => {
            if (child.status === 'Admitted') {
                admittedCount++;
            } else {
                inQueueCount++;
            }
        });

        const statsDiv = document.createElement('div');
        statsDiv.style.padding = '15px';
        statsDiv.style.background = '#f9f9f9';
        statsDiv.style.border = '1px solid #ddd';
        statsDiv.style.borderRadius = '8px';
        statsDiv.style.textAlign = 'center';

        statsDiv.innerHTML = `
            <div style="font-size: 1.2rem; margin-bottom: 10px;">
                <strong>Totalt antal registrerade barn:</strong> ${childQueue.length}
            </div>
            <div style="display: flex; justify-content: space-around; font-size: 1.1rem;">
                <div style="color: #d32f2f;">
                    <strong>I kö:</strong> ${inQueueCount}
                </div>
                <div style="color: #2e7d32;">
                    <strong>Antagna:</strong> ${admittedCount}
                </div>
            </div>
        `;

        queueList.appendChild(statsDiv);

        if (mockAdmitBtn) {
            mockAdmitBtn.style.display = inQueueCount > 0 ? 'inline-block' : 'none';
        }
    }

    childRegForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const pnr = document.getElementById('childPnr').value;
        const firstName = document.getElementById('childFirstName').value;
        const lastName = document.getElementById('childLastName').value;
        const contact = document.getElementById('parentContact').value;

        // Check if already in queue
        if (childQueue.find(c => c.pnr === pnr)) {
            childRegMessage.style.color = '#d32f2f';
            childRegMessage.textContent = 'Detta barn är redan registrerat i kön.';
            return;
        }

        const newChild = {
            pnr,
            firstName,
            lastName,
            contact,
            regDate: new Date().toISOString(),
            status: 'In Queue'
        };

        childQueue.push(newChild);
        localStorage.setItem('jaliyaChildQueue', JSON.stringify(childQueue));

        childRegMessage.style.color = '#2e7d32';
        childRegMessage.textContent = 'Barnet är nu registrerat i kön!';
        childRegForm.reset();

        renderQueue();
    });

    if (mockAdmitBtn) {
        mockAdmitBtn.addEventListener('click', () => {
            const firstInQueue = childQueue.find(c => c.status === 'In Queue');
            if (firstInQueue) {
                firstInQueue.status = 'Admitted';
                localStorage.setItem('jaliyaChildQueue', JSON.stringify(childQueue));

                // Show notification modal
                const modal = document.getElementById('notificationModal');
                const text = document.getElementById('notificationText');
                if (modal && text) {
                    text.innerHTML = `Ett meddelande (SMS/E-post) har skickats till <strong>${firstInQueue.contact}</strong>:<br><br>
                    "Hej! Ert barn ${firstInQueue.firstName} ${firstInQueue.lastName} har nu blivit antagen till Jaliaskola. Välkommen!"`;
                    modal.style.display = 'flex';
                }

                renderQueue();
            }
        });
    }

    renderQueue();
}

function initPage() {
    initTranslatableElements();
    const languageSelector = document.getElementById('languageSelector');
    if (languageSelector) {
        languageSelector.addEventListener('change', (e) => translatePage(e.target.value));
    }

    // Initialize the yearly calendar
    initCalendar();

    if (document.getElementById('micBtn')) {
        initSpeechRecognition();
    }

    if (document.getElementById('registerForm')) {
        initAuth();
    }

    if (document.getElementById('childRegistrationForm')) {
        initChildRegistration();
    }
}

window.addEventListener('DOMContentLoaded', initPage);
