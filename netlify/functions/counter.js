const { promises: fs } = require('fs');

exports.handler = async function(event, context) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Content-Type': 'application/json'
    };

    try {
        // Используем tmp директорию для хранения счетчика
        const counterFile = '/tmp/counter.txt';

        // Читаем текущее значение
        let count = 0;
        try {
            const data = await fs.readFile(counterFile, 'utf8');
            count = parseInt(data) || 0;
        } catch (error) {
            // Файл не существует, начинаем с 0
        }

        // Увеличиваем счетчик
        count++;

        // Записываем новое значение
        await fs.writeFile(counterFile, count.toString());

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ views: count })
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Counter error' })
        };
    }
}; 