// Правильная дата: 29.6.25
const CORRECT_DATE = "29.6.25";
let yesClickCount = 0;
const MAX_YES_CLICKS = 8;

// Дата начала отношений: 29 июня 2025, 01:30
const RELATIONSHIP_START = new Date(2025, 5, 29, 1, 30, 0); // месяцы считаются с 0

// Проверка даты
function checkDate() {
    const input = document.getElementById('dateInput').value.trim();
    const errorDiv = document.getElementById('dateError');
    
    if (input === CORRECT_DATE) {
        errorDiv.textContent = '';
        showPage(2);
        document.getElementById('dateInput').value = '';
    } else {
        errorDiv.textContent = '❌ Неправильная дата! Попробуй ещё...';
    }
}

// Обработка галочки
function handleCheckbox() {
    const checkbox = document.getElementById('loveCheckbox');
    if (checkbox.checked) {
        setTimeout(() => {
            showPage('2-5');
            checkbox.checked = false;
        }, 500);
    }
}

// Обработка кнопки "Да"
function handleYes() {
    yesClickCount++;
    const counter = document.getElementById('clickCounter');
    
    if (yesClickCount < MAX_YES_CLICKS) {
        counter.textContent = `Ещё ${MAX_YES_CLICKS - yesClickCount} раз...`;
        animateYesButton();
    } else {
        counter.textContent = '';
        setTimeout(() => {
            showPage(4);
            startFinalAnimation();
        }, 300);
    }
}

// Анимация кнопки "Да" - небольшой скачок
function animateYesButton() {
    const yesBtn = document.getElementById('yesBtn');
    yesBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        yesBtn.style.transform = 'scale(1)';
    }, 100);
}

// Перемещение кнопки "Нет"
function moveButton(button) {
    const randomX = (Math.random() - 0.5) * 200;
    const randomY = (Math.random() - 0.5) * 200;
    
    button.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Переключение страниц
function showPage(pageNumber) {
    // Скрываем все страницы
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Показываем нужную страницу
    if (pageNumber === '2-5') {
        document.getElementById('page2-5').classList.add('active');
    } else {
        document.getElementById(`page${pageNumber}`).classList.add('active');
    }
}

// Финальная анимация
function startFinalAnimation() {
    // Запускаем счётчик времени
    updateTimeCounter();
    setInterval(updateTimeCounter, 1000);
    
    // Показываем уведомления случайно
    startRandomNotifications();
}

// Обновление счётчика времени
function updateTimeCounter() {
    const now = new Date();
    const diff = now - RELATIONSHIP_START;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Падающие сердечки
function createFallingHearts() {
    const container = document.getElementById('falling-hearts');
    let heartCount = 0;
    
    const interval = setInterval(() => {
        if (heartCount > 50) clearInterval(interval); // Ограничиваем количество
        
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.textContent = '❤️';
        
        const randomLeft = Math.random() * 100;
        const randomDuration = 6 + Math.random() * 2; // 6-8 секунд
        
        heart.style.left = randomLeft + '%';
        heart.style.animationDuration = randomDuration + 's';
        
        container.appendChild(heart);
        heartCount++;
        
        // Удаляем элемент после завершения анимации
        setTimeout(() => heart.remove(), randomDuration * 1000);
    }, 1000); // По одному сердечку в секунду
}

// Случайные уведомления
function startRandomNotifications() {
    const messages = [
        '💕 Я люблю тебя',
        '❤️ Ты лучшая',
        '💫 Спасибо за всё',
        '✨ Ты королева',
        '🎁 Ты моя любовь'
    ];
    
    // Показываем уведомление каждые 4-6 секунд
    setInterval(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showNotification(randomMessage);
    }, 5000 + Math.random() * 2000);
}

// Показ уведомления
function showNotification(message) {
    const container = document.getElementById('notifications-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Удаляем уведомление через 3 секунды
    setTimeout(() => notification.remove(), 3000);
}

// Частицы при клике на кнопки
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn')) {
        createParticles(e.clientX, e.clientY);
    }
});

function createParticles(x, y) {
    const particles = ['💖', '✨', '⭐', '💫', '🌟'];
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.fontSize = '1.2em';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        particle.style.animation = `particleFloat ${1.5 + Math.random() * 0.5}s ease-out forwards`;
        particle.style.setProperty('--vx', vx);
        particle.style.setProperty('--vy', vy);
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// CSS для частиц
const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        to {
            transform: translate(calc(var(--vx) * 100px), calc(var(--vy) * 100px));
            opacity: 0;
        }
    }
    @keyframes float {
        to {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyle);

// Обработка Enter для ввода даты
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('dateInput');
    dateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkDate();
        }
    });
    
    // Фокус на первый инпут
    dateInput.focus();
    
    // Запускаем падающие сердечки сразу
    createFallingHearts();
});
