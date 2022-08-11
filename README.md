### 📰 Movies
--------------------------
Проект Movies - выпускная работа по профессии веб-разработчик курса Яндекс Практикум
#### [План работы над дипломным проектом (Online)](https://trello.com/b/CbFnh2HD/project-diploma-work)
#### [Индивидуальный макет в Figm'e](https://www.figma.com/file/mIrPoMCYLA3glp9KZDm7yt/Diploma-(Copy)?node-id=891%3A3857)
## [Дипломный проект(Фронтенд)](https://mydiplom.nomoredomains.xyz)
## [Ссылка для ревьюера на Pull Request](https://github.com/MiskevichStanislav/movies-explorer-frontend/pull/2)

#### Выполнил работу: Мискевич Станислав

 ### ✍🏻Краткое описание проекта
Проект представляет собой сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

Пользователь, зайдя на сайт, попадает на главную страницу с описанием проекта, используемых технологий и автора данного проекта. Пройдя по ссылкам "Регистрация" или "Войти" можно зарегестрироваться или авторизоваться.

На странице "Фильмы" пользователь вводит в строку поиска ключевые слова и нажимает кнопку «Искать». После этого сайт должен выполнить два действия:

- Отправить запрос к сервису BeatfilmMoviesApi с данными о фильмах, получить данные и сохранить;
- Найти все подходящие фильмы, согласно выбранному жанру, и отобразить карточки с ними;
- Когда пользователь сохраняет фильм, он должен отображаться в специальном разделе сайта.

Сайт состоит из 6 страниц:

_ Главная. Содержит информацию о выполненном проекте.
- Страница с фильмами. На ней есть форма поиска фильмов и блок с результатами поиска.
- Страница с сохранёнными фильмами. Показывает фильмы, сохранённые пользователем.
- Страница регистрации. Позволяет пользователю зарегистрировать аккаунт.
- Страница авторизации. На ней пользователь может войти в систему.
- Страница редактирования профиля. Пользователь может изменить данные своего аккаунта.

### 📖Задачи

Проект адаптирован под различные разрешения экрана, соответствует макетам, сделанным для них.
Все блоки из макета свёрстаны. Корректно работает навигация между страницами и ссылки на внешние ресурсы: ни одна ссылка не ведёт в пустоту или на якорь, внешние ссылки открываются в новой вкладке.
Отзывчивая вёрстка, которая корректно тянется на всех промежуточных разрешениях.
Отсутствуют ошибки валидации.
Разметка портирована в JSX.

Модальные окны настроены и направляют запросы на соответствующие роуты написанного для этого проекта API.
Правильно работают оба состояния шапки. Если пользователь не вошёл в систему и находится на главной странице, в шапке должны быть кнопки «Регистрация» и «Войти». Если пользователь залогинился, в шапке сайта отображаются кнопки «Фильмы», «Сохранённые фильмы» и «Аккаунт».
После успешного сабмита формы поиска появляется блок с результатами. Если ничего не найдено, появляется надпись «Ничего не найдено».
В блоке результата отображаются 3 карточки. Нажатие на кнопку «Показать ещё» отображает следующие 3 карточки.
Если пользователь закрыл вкладку, а после — вернулся на сайт, данные достаются из локального хранилища при монтировании компонента App.
При клике на иконку «Лайк» без заливки выполняется запрос к /movies нашего API на сохранение фильма. Клик по иконке с заливкой — запрос на удаление.
На странице «Сохранённые фильмы» под шапкой, отображается форма поиска, аналогичная форме на странице "Фильмы". При вводе данных в эту форму и её отправке — запрос к серверу не отправляется. Поиск происходит по фильмам, которые пользователь сохранил.
Роут /saved-movies защищён HOC-компонентом ProtectedRoute.

 ### 📃Используемые Технологии:
 <img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-plain-wordmark.svg"  title="CSS3" alt="CSS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" title="HTML5" alt="HTML" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://user-images.githubusercontent.com/78322084/162064174-194ac89a-024d-4839-aae3-22d9ee4e3a33.png"  title="GitHub" alt="GitHub" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
   <img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
   <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
   <img src="https://github.com/devicons/devicon/blob/master/icons/nginx/nginx-original.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
    <img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;


 ### 💻Установка зависимостей
- npm init – установить зависимости проекта
- npm start – запуск devServer на http://localhost:3000/
- npm build – production сборка проекта