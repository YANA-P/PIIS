document.addEventListener('DOMContentLoaded', () => {
    const selectedShirt = JSON.parse(localStorage.getItem('selectedShirt'));

    if (!selectedShirt) {
        alert('No shirt selected!');
        window.location.href = 'index.html'; // Возвращаем на главную, если данных нет
        return;
    }

    // Заполняем информацию о футболке
    document.getElementById('shirt-name').textContent = selectedShirt.name;
    document.getElementById('shirt-description').textContent = selectedShirt.description;
    document.getElementById('shirt-price').textContent = selectedShirt.price;

    let currentSide = 'front';
    let currentColor = 'white';

    // Устанавливаем изображения по умолчанию
    document.getElementById('shirt-front').src = selectedShirt.colors[currentColor][currentSide];

    // Переключение сторон
    const frontButton = document.getElementById('side-front');
    const backButton = document.getElementById('side-back');

    frontButton.addEventListener('click', () => {
        currentSide = 'front';
        document.getElementById('shirt-front').src = selectedShirt.colors[currentColor][currentSide];
        frontButton.classList.add('selected');
        backButton.classList.remove('selected');
    });

    backButton.addEventListener('click', () => {
        currentSide = 'back';
        document.getElementById('shirt-front').src = selectedShirt.colors[currentColor][currentSide];
        backButton.classList.add('selected');
        frontButton.classList.remove('selected');
    });

    // Генерируем кнопки для цветов
    const colorButtonsContainer = document.getElementById('color-buttons');
    const colors = selectedShirt.colors;

    for (const color in colors) {
        const button = document.createElement('button');
        button.textContent = color;
        button.style.backgroundColor = color;
        button.classList.add('color-button');
        button.addEventListener('click', () => {
            currentColor = color;
            document.getElementById('shirt-front').src = selectedShirt.colors[color][currentSide];
            
            // Убираем выбранный класс с других кнопок
            document.querySelectorAll('.color-button').forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
        });
        colorButtonsContainer.appendChild(button);
    }
});