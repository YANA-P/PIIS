// 1. Сколько фильмов посмотрел, и проверка корректности ответа
let numberOfFilms;

while (true) {
    numberOfFilms = prompt('Сколько фильмов вы уже посмотрели?', '').trim();

    // Проверяем, является ли ввод числом, не пустым и не отрицательным
    if (numberOfFilms !== '' && !isNaN(numberOfFilms) && +numberOfFilms >= 0) {
        numberOfFilms = +numberOfFilms; // Преобразуем строку в число
        break; // Если ввод корректный, выходим из цикла
    } else {
        alert('Пожалуйста, введите корректное число'); // Сообщение об ошибке
    }
}


// 2. Создаем объект personalMovieDB с начальными значениями
const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
};

// Функция для проверки ответов пользователя на валидность
function askQuestion() {
    let movieName, movieRating;

    // 3. Задаем вопросы пользователю и проверяем ответы
    for (let i = 0; i < 2; i++) {
        movieName = prompt('Один из последних просмотренных фильмов?', '').trim();
        movieRating = prompt('На сколько оцените его? (от 0 до 10)', '').trim();

        // 4. Проверяем корректность ответа
        if (
            movieName &&
            movieName.length <= 50 &&
            movieRating !== '' &&
            !isNaN(movieRating) &&
            +movieRating >= 0 &&
            +movieRating <= 10
        ) {
            // 5. Записываем ответы в объект movies
            personalMovieDB.movies[movieName] = movieRating;
        } else {
            // Если ответы некорректные, задаем вопросы заново
            i--;
        }
    }
}

// Вызываем функцию для вопросов
askQuestion();

// 6. Выводим в консоль объект personalMovieDB
console.log(personalMovieDB.movies);