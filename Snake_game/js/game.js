//константа с выбором объекта
const canvas = document.getElementById("game");
//константа с указанием формата игры
const ctx = canvas.getContext("2d");
//константа - игровое поле
const ground = new Image();
//путь к картинке игрового поля
ground.src = "img/ground.png";
//константа - объект съедания 
const foodImg = new Image();
//путь к картинке еды
foodImg.src = "img/food.png";
//константа счёта, которая будет меняться в зависимости от набранных очков
let score = 0;
// размер клетки игрового поля
let box = 32;


//появление еды случайным образом на поле про помощи Random
let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,
};
//первоначальное появление змейки на игровом поле в центре
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};
//функция, реализующая обрабочик событий нажатие клавиш на клавиатуре по коду клавиши
//если нажата клавиша "вправо" не может быть нажата клавиша "влево",
//если нажата клавиша "вверх", нельзя нажать "вниз" и т.д.
document.addEventListener("keydown", direction);
let dir; //временная переменная для хранения нажатия клавиши
function direction(event) {
    if (event.keyCode == 37 && dir != "right") //дополнительная проверка
        dir = "left";
    else if (event.keyCode == 38 && dir != "down") //дополнительная проверка
        dir = "up";
    else if (event.keyCode == 39 && dir != "left") //дополнительная проверка
        dir = "right";
    else if (event.keyCode == 40 && dir != "up") //дополнительная проверка
        dir = "down";
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y)
            clearInterval(game);
    }
}
//функция отрисовки игрового поля в окне
function drawGame() {
    ctx.drawImage(ground, 0, 0);
    //отрисовка змейки, первоначально голова змейки зелёная, когда она съедает еду-добавляется красный элемент тела, следующий за головой
    ctx.drawImage(foodImg, food.x, food.y);
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "green" : "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    //отрисовка очков кеглем 50 шрифтом Arial белого цвета
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);
    //движение змейки по игровому полю
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (snakeX == food.x && snakeY == food.y) {
        score++;
        //появление еды в новом месте после съедания змейкой
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box,
            y: Math.floor((Math.random() * 15 + 3)) * box,
        };
    } else {
        snake.pop(); //удаление последнего элемента в массиве-змейка двигается
    }
    if (snakeX < box || snakeX > box * 17 ||
        snakeY < 3 * box || snakeY > box * 17)

        clearInterval(game);
    if (dir == "left") snakeX -= box;
    if (dir == "right") snakeX += box;
    if (dir == "up") snakeY -= box;
    if (dir == "down") snakeY += box;
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    eatTail(newHead, snake);
    snake.unshift(newHead);
}
//вызов функции игры каждые 100 мс
let game = setInterval(drawGame, 100);