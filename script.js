// Правильная дата: 29.6.25
const CORRECT_DATE = "29.6.25";
let yesClickCount = 0;
const MAX_YES_CLICKS = 8;

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
            showPage(3);
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
    document.getElementById(`page${pageNumber}`).classList.add('active');
}

// Финальная анимация
function startFinalAnimation() {
    const photoContainer = document.getElementById('photoContainer');
    
    // Здесь можно добавить дополнительные эффекты
    // Фото будет плавно отдаляться благодаря CSS анимации
    
    // Автоматически скрыть через 10 секунд (опционально)
    setTimeout(() => {
        // Можно добавить какое-то действие после 10 секунд
    }, 10000);
}

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
});

// Эмодзи анимация для кнопок
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function() {
        createConfetti(this);
    });
});

// Создание конфетти эффекта (опционально)
function createConfetti(element) {
    const rect = element.getBoundingClientRect();
    const emojis = ['💝', '💕', '❤️', '🎁', '✨'];
    
    for (let i = 0; i < 3; i++) {
        const confetti = document.createElement('div');
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + 'px';
        confetti.style.fontSize = '1.5em';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = 'float 1s ease-in forwards';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 1000);
    }
}

// CSS для конфетти анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        to {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
