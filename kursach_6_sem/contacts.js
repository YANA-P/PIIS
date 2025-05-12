const burgerMenu = document.getElementById('burgerMenu');
const navLinks = document.getElementById('navLinks');

burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

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

// Обработка формы
const feedbackForm = document.querySelector('.feedback-form');

feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(feedbackForm);
    const data = Object.fromEntries(formData.entries());
    
    // Очистка формы и показ сообщения
    feedbackForm.reset();
    alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
});

