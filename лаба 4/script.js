document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('products-container');
    const modal = document.getElementById('modal');
    const modalName = document.getElementById('modal-name');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const modalFrontImage = document.getElementById('modal-front-image');
    const modalBackImage = document.getElementById('modal-back-image');
    const closeModal = document.querySelector('.close');
    
    // Функция для создания карточки товара
    function createProductCard(shirt) {
        const card = document.createElement('div');
        card.classList.add('product-card');
        
        // Создание элементов карточки
        const name = document.createElement('h3');
        name.textContent = shirt.name || 'No Name';
        
        const description = document.createElement('p');
        description.textContent = `Available in ${Object.keys(shirt.colors).length} color${Object.keys(shirt.colors).length > 1 ? 's' : ''}`;
        
        const price = document.createElement('p');
        price.classList.add('price');
        price.textContent = shirt.price || 'No Price';
        
        const imgFront = document.createElement('img');
        const defaultImage = shirt.default ? shirt.default.front : 'default.png';
        imgFront.src = shirt.colors?.white?.front || defaultImage;
        imgFront.alt = `${shirt.name} - Front Image`;
        
        const quickViewButton = document.createElement('button');
        quickViewButton.textContent = 'Quick View';
        
        const seePageButton = document.createElement('button');
        seePageButton.textContent = 'See Page';
        
        // Обработчик кнопки Quick View
        quickViewButton.addEventListener('click', () => {
            modal.style.display = 'block';
            modalName.textContent = shirt.name || 'No Name';
            modalDescription.textContent = shirt.description || 'No Description Available';
            modalPrice.textContent = shirt.price || 'No Price';
            modalFrontImage.src = shirt.colors?.white?.front || shirt.default.front;
            modalBackImage.src = shirt.colors?.white?.back || shirt.default.back;
        });

        // Обработчик для кнопки See Page
        seePageButton.addEventListener('click', () => {
            // Сохраняем данные футболки в localStorage
            localStorage.setItem('selectedShirt', JSON.stringify(shirt));
            // Переходим на страницу с деталями
            window.location.href = 'details.html';
        });

        // Добавляем элементы в карточку
        card.appendChild(imgFront);
        card.appendChild(name);
        card.appendChild(description);
        card.appendChild(price);
        card.appendChild(quickViewButton);
        card.appendChild(seePageButton);
        
        return card;
    }

    // Рендерим все товары
    shirts.forEach(shirt => {
        const productCard = createProductCard(shirt);
        container.appendChild(productCard);
    });

    // Закрытие модального окна
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
});

