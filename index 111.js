const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// Загрузка переменных окружения из .env
dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());

const YMAPS_API_KEY = process.env.YMAPS_API_KEY;

if (!YMAPS_API_KEY) {
  console.error('❌ YMAPS_API_KEY не найден в .env!');
  process.exit(1);
}

app.use(express.static('public'));

// Возвращаем JS-файл, который подключает Яндекс.Карты с ключом
app.get('/ymaps-loader.js', (req, res) => {
  res.set('Content-Type', 'application/javascript');
  res.send(`
    const script = document.createElement('script');
    script.src = "https://api-maps.yandex.ru/2.1/?apikey=${YMAPS_API_KEY}&lang=ru_RU";
    script.type = "text/javascript";
    document.head.appendChild(script);
  `);
});

app.listen(PORT, () => {
  console.log(`✅ Server started on http://localhost:${PORT}`);
});
