document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target');
    let selectedElement = null;
    let offsetX = 0, offsetY = 0;
    let initialPosition = { x: 0, y: 0 };
    let isSticky = false; // Флаг для "прилипшего" элемента
    let stickyElement = null; // Элемент, который был "прилиплен"
    let stickyOffsetX = 0, stickyOffsetY = 0; // Смещение для "прилипшего" элемента
    
    // Функция начала перетаскивания элемента
    function onMouseDown(event) {
      if (isSticky && stickyElement === event.target) return; // Если элемент приклеен, не начинать обычное перетаскивание
  
      selectedElement = event.target;
      offsetX = event.clientX - selectedElement.getBoundingClientRect().left;
      offsetY = event.clientY - selectedElement.getBoundingClientRect().top;
      
      initialPosition.x = selectedElement.style.left;
      initialPosition.y = selectedElement.style.top;
    }
  
    // Функция перемещения элемента за курсором
    function onMouseMove(event) {
      if (selectedElement) {
        selectedElement.style.left = `${event.clientX - offsetX}px`;
        selectedElement.style.top = `${event.clientY - offsetY}px`;
      }
  
      // Перемещение "приклеенного" элемента за курсором
      if (isSticky && stickyElement) {
        stickyElement.style.left = `${event.clientX - stickyOffsetX}px`;
        stickyElement.style.top = `${event.clientY - stickyOffsetY}px`;
      }
    }
  
    // Функция остановки перетаскивания при отпускании кнопки мыши
    function onMouseUp() {
      selectedElement = null;
    }
  
    // Функция приклеивания элемента при двойном клике
    function onDoubleClick(event) {
      stickyElement = event.target;
      isSticky = true;
      
      // Вычисляем смещение для "приклеенного" элемента
      stickyOffsetX = event.clientX - stickyElement.getBoundingClientRect().left;
      stickyOffsetY = event.clientY - stickyElement.getBoundingClientRect().top;
      
      stickyElement.style.backgroundColor = 'pink'; // Меняем цвет на синий
    }
  
    // Функция открепления "приклеенного" элемента при клике
    function onClick(event) {
      if (isSticky && stickyElement === event.target) {
        isSticky = false;
        stickyElement.style.backgroundColor = 'red'; // Возвращаем цвет
        stickyElement = null;
      }
    }
  
    // Функция возврата элемента на исходную позицию при нажатии Esc
    function onKeyDown(event) {
      if (event.key === 'Escape') {
        if (selectedElement) {
          selectedElement.style.left = initialPosition.x;
          selectedElement.style.top = initialPosition.y;
          selectedElement = null;
        }
        
        if (isSticky && stickyElement) {
          stickyElement.style.left = initialPosition.x;
          stickyElement.style.top = initialPosition.y;
          stickyElement.style.backgroundColor = 'red'; // Возвращаем цвет
          isSticky = false;
          stickyElement = null;
        }
      }
    }
  
    // Добавление обработчиков событий для всех div элементов
    targets.forEach(target => {
      target.addEventListener('mousedown', onMouseDown);
      target.addEventListener('mouseup', onMouseUp);
      target.addEventListener('dblclick', onDoubleClick);
      target.addEventListener('click', onClick);
    });
  
    // Слушаем события движения и нажатия клавиш
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('keydown', onKeyDown);
  });
  
    