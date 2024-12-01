const svg = document.getElementById('canvas');
const clearButton = document.getElementById('clearButton');

let isDrawing = false; // Флаг для отслеживания состояния рисования
let startX, startY, currentShape;

// Начало рисования
svg.addEventListener('mousedown', event => {
    isDrawing = true;
    startX = event.offsetX; // Начальная координата X
    startY = event.offsetY; // Начальная координата Y

    const shapeSelector = document.getElementsByName('shape');
    let selectedValue;
    for (const shape of shapeSelector) {
        if (shape.checked) {
            selectedValue = shape.value; // Получаем выбранную фигуру
            break;
        }
    }

    if (selectedValue === 'circle') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        currentShape.setAttribute('cx', startX); // Установка центра круга
        currentShape.setAttribute('cy', startY);
        currentShape.setAttribute('r', 0); // Радиус пока 0
        currentShape.setAttribute('fill', 'rgba(100, 200, 255, 0.5)'); // Цвет круга
        svg.appendChild(currentShape); // Добавление круга на холст
    } else if (selectedValue === 'rectangle') {
        currentShape = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        currentShape.setAttribute('x', startX); // Установка начальных координат
        currentShape.setAttribute('y', startY);
        currentShape.setAttribute('width', 0); // Ширина пока 0
        currentShape.setAttribute('height', 0); // Высота пока 0
        currentShape.setAttribute('fill', 'rgba(255, 200, 100, 0.5)'); // Цвет прямоугольника
        svg.appendChild(currentShape); // Добавление прямоугольника на холст
    }
});

// Рисование
svg.addEventListener('mousemove', event => {
    if (!isDrawing) return; // Если не рисуем, выходим

    const currentX = event.offsetX; // Текущая координата X
    const currentY = event.offsetY; // Текущая координата Y

    if (currentShape) {
        if (currentShape.tagName === 'circle') {
            const radius = Math.sqrt(
                Math.pow(currentX - startX, 2) + Math.pow(currentY - startY, 2)
            );
            currentShape.setAttribute('r', radius); // Устанавливаем радиус
        } else if (currentShape.tagName === 'rect') {
            const width = currentX - startX; // Ширина
            const height = currentY - startY; // Высота

            currentShape.setAttribute('x', Math.min(startX, currentX)); // Установка X
            currentShape.setAttribute('y', Math.min(startY, currentY)); // Установка Y
            currentShape.setAttribute('width', Math.abs(width)); // Установка ширины
            currentShape.setAttribute('height', Math.abs(height)); // Установка высоты
        }
    }
});

// Завершение рисования
svg.addEventListener('mouseup', () => {
    isDrawing = false; // Остановка рисования
    currentShape = null; // Сброс текущей фигуры
});

// Очистка поля рисования
clearButton.addEventListener('click', () => {
    svg.innerHTML = ''; // Очистка всех фигур на холсте
});





