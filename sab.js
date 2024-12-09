const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');

// Устанавливаем размеры canvas на полный экран
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Массив для снежинок
let snowflakes = [];

// Создание снежинок
function createSnowflakes() {
    const count = 200; // Количество снежинок
    for (let i = 0; i < count; i++) {
        snowflakes.push({
            x: Math.random() * canvas.width, // Случайное положение по X
            y: Math.random() * canvas.height, // Случайное положение по Y
            radius: Math.random() * 3 + 1, // Радиус снежинки
            speedX: Math.random() * 2 - 1, // Горизонтальная скорость
            speedY: Math.random() * 3 + 1, // Вертикальная скорость
        });
    }
}

// Рендеринг снежинок
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка экрана
    ctx.fillStyle = 'white';
    ctx.beginPath();
    snowflakes.forEach(flake => {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });
    ctx.fill();
}

// Обновление положения снежинок
function updateSnowflakes() {
    snowflakes.forEach(flake => {
        flake.x += flake.speedX;
        flake.y += flake.speedY;

        // Перемещаем снежинки обратно сверху, если они выходят за экран
        if (flake.y > canvas.height) {
            flake.y = -flake.radius;
            flake.x = Math.random() * canvas.width;
        }

        // Перемещаем снежинки обратно, если они выходят за боковые границы
        if (flake.x > canvas.width) flake.x = 0;
        if (flake.x < 0) flake.x = canvas.width;
    });
}

// Основной цикл анимации
function animate() {
    drawSnowflakes();
    updateSnowflakes();
    requestAnimationFrame(animate); // Цикл анимации
}

// Инициализация
createSnowflakes();
animate();

// Обновление размеров экрана
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    snowflakes = [];
    createSnowflakes();
});
