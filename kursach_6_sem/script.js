let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');

// Инициализация карусели главного баннера
function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Автоматическая смена слайдов каждые 5 секунд
setInterval(nextSlide, 5000);


// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    if (document.body.classList.contains('dark-theme')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
});


// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Карусель услуг - прокрутка по одной карточке
function moveCarousel(sectionId, direction) {
    const carousel = document.getElementById(`${sectionId}-carousel`);
    const card = carousel.querySelector('.service-card');
    const cardWidth = card.offsetWidth + 30; // включая gap
    const scrollAmount = cardWidth * direction;
    
    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Управление модальными окнами
const modals = {
    wallModal: document.getElementById('wallModal'),
    landscapeModal: document.getElementById('landscapeModal'),
    interiorModal: document.getElementById('interiorModal')
};

// Открытие модального окна
document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        const serviceName = btn.getAttribute('data-service');
        
        // Устанавливаем название услуги в модальном окне
        const modal = modals[modalId];
        modal.querySelector('.modal-service-name').textContent = serviceName;
        
        // Показываем модальное окно
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
});

// Закрытие модальных окон
document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.style.display = 'none';
        });
        document.body.style.overflow = 'auto';
    });
});

// Закрытие при клике вне модального окна
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});



const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// Обработка форм
document.querySelectorAll('.order-form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Здесь можно отправить данные на сервер
        console.log('Данные заказа:', data);
        
        // Закрываем модальное окно
        form.closest('.modal').style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Можно добавить уведомление об успешной отправке
        alert('Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.');
    });
});