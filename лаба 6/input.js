document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.target');
    let selectedElement = null;
    let offsetX = 0, offsetY = 0;
    let initialPosition = { x: 0, y: 0 };
    let isSticky = false; // Флаг для "прилипшего" элемента
    let stickyElement = null; // Элемент, который был "прилиплен"
    let lastTouchTime = 0;
  
    // Функция начала перетаскивания элемента (как для мыши, так и для сенсорных событий)
    function onStart(event) {
      const touch = event.touches ? event.touches[0] : event; // Для touch или mouse событий
      if (isSticky && stickyElement) return; // Если элемент приклеен, не начинать обычное перетаскивание
  
      selectedElement = event.target;
      const rect = selectedElement.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
  
      initialPosition.x = selectedElement.style.left;
      initialPosition.y = selectedElement.style.top;
    }
  
    // Функция перемещения элемента за курсором или пальцем
    function onMove(event) {
      const touch = event.touches ? event.touches[0] : event;
      
      if (selectedElement) {
        selectedElement.style.left = `${touch.clientX - offsetX}px`;
        selectedElement.style.top = `${touch.clientY - offsetY}px`;
      }
  
      // Перемещение "приклеенного" элемента за пальцем
      if (isSticky && stickyElement) {
        stickyElement.style.left = `${touch.clientX}px`;
        stickyElement.style.top = `${touch.clientY}px`;
      }
    }
  
    // Функция остановки перетаскивания при отпускании пальца/кнопки мыши
    function onEnd() {
      selectedElement = null;
    }
  
    // Функция обработки двойного клика или двойного касания
    function onDoubleClickOrTouch(event) {
      const currentTime = new Date().getTime();
      const touch = event.touches ? event.touches[0] : event;
  
      // Проверяем, если прошло мало времени между двумя touchstart событиями
      if (currentTime - lastTouchTime < 300) {
        stickyElement = event.target;
        isSticky = true;
      }
  
      lastTouchTime = currentTime;
    }
  
    // Функция открепления элемента при одиночном клике или касании
    function onSingleClickOrTouch(event) {
      if (isSticky && stickyElement) {
        isSticky = false;
        stickyElement = null;
      }
    }
  
    // Функция возврата элемента на исходную позицию при касании двумя пальцами
    function onMultiTouch(event) {
      if (event.touches.length > 1) {
        if (selectedElement) {
          selectedElement.style.left = initialPosition.x;
          selectedElement.style.top = initialPosition.y;
          selectedElement = null;
        }
  
        if (isSticky && stickyElement) {
          stickyElement.style.left = initialPosition.x;
          stickyElement.style.top = initialPosition.y;
          isSticky = false;
          stickyElement = null;
        }
      }
    }
  
    // Добавление обработчиков событий для всех div элементов
    targets.forEach(target => {
      // Для мыши
      target.addEventListener('mousedown', onStart);
      target.addEventListener('mousemove', onMove);
      target.addEventListener('mouseup', onEnd);
      target.addEventListener('dblclick', onDoubleClickOrTouch);
      target.addEventListener('click', onSingleClickOrTouch);
  
      // Для сенсорного экрана
      target.addEventListener('touchstart', onStart);
      target.addEventListener('touchmove', onMove);
      target.addEventListener('touchend', onEnd);
      target.addEventListener('touchstart', onDoubleClickOrTouch); 
      target.addEventListener('touchstart', onSingleClickOrTouch); 
    });
  
    // Слушаем сенсорные события для возврата при касании двумя пальцами
    document.addEventListener('touchstart', onMultiTouch);
  
    // Слушаем движение мыши и нажатие клавиш
    document.addEventListener('mousemove', onMove);
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (selectedElement) {
          selectedElement.style.left = initialPosition.x;
          selectedElement.style.top = initialPosition.y;
          selectedElement = null;
        }
  
        if (isSticky && stickyElement) {
          stickyElement.style.left = initialPosition.x;
          stickyElement.style.top = initialPosition.y;
          isSticky = false;
          stickyElement = null;
        }
      }
    });
  });
  