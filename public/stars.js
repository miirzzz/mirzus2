function createStars() {
    const container = document.querySelector('.stars');
    const starCount = 200; // Уменьшаем количество для производительности

    // Создаем новые звезды только если их недостаточно
    if (container.children.length < starCount) {
        const starsToAdd = starCount - container.children.length;
        
        for (let i = 0; i < starsToAdd; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Случайный размер и яркость
            if (Math.random() > 0.8) {
                star.classList.add('bright');
            }
            
            // Случайное положение
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Случайная длительность и задержка анимации
            const duration = 5 + Math.random() * 5; // Увеличиваем длительность
            star.style.setProperty('--duration', `${duration}s`);
            star.style.animationDelay = `${Math.random() * duration}s`;
            
            // Добавляем обработчик окончания анимации
            star.addEventListener('animationend', () => {
                // Обновляем позицию и задержку
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = '0s';
                // Перезапускаем анимацию
                star.style.animation = 'none';
                star.offsetHeight; // Форсируем reflow
                star.style.animation = `starTravel ${duration}s linear infinite`;
            });
            
            container.appendChild(star);
        }
    }
}

// Создаем звезды при загрузке
window.addEventListener('load', createStars);

// Запускаем периодическое обновление звезд
setInterval(createStars, 1000); 