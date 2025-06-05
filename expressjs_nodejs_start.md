# Работа с Express.js + Node.js

Гайд: https://www.youtube.com/watch?v=-k_59yF_5GA

### Иницализация проекта в текущей папке
```
npm init -y
```

### Установка Express JS
```
npm i express
```

### Установка инструмента для автоматического перезапуска проекта при изменении файлов

```
npm i nodemon
```

### Создать главный запускаемый файл src\index.js

### Добавить скрипт для запуска главного файла в package.json
```json
  ...
  "scripts": {
    "start": "nodemon src\\index.js"
  },
  ...
```

### Добавить "type": "module" в package.json для включения возможности модульного импорта файлов в проекте
```json
  ...
  "main": "index.js",
  "type": "module",
  "scripts": {
  ...
```

> [!WARNING]
> При импорте js файлов обязательно нужно указывать расширение файла (VS Code его не указывает при автоматическом импорте)

Пример:
```js
import { DATA } from "./service.js";
```

### В файл src\index.js добавить код:
```js
import express from 'express'

const APP_RUN_PORT = 4200;

const app = express()

const main = async () => {
  app.use(express.json());

  app.get('/api/hello', (req, res) => {
    res
      .status(200)
      .json({ message: "Hello!" })
  })

  app.all('/*notfound', (req, res) => {
    res
      .status(404)
      .json({ message: "Такого эндпоинта нет..." })
  })

  app.listen(APP_RUN_PORT, () => {
    console.log(`Server is running on http://localhost:${APP_RUN_PORT}`)
  })
}

main()
```

### Запустить
```
npm run start
```

### Проверить корректность выполнения запроса
```http
GET http://localhost:4200/api/hello
```

### Библиотека для работы с .env
```
npm i dotenv
```

При запуске проекта:
```js
import dotenv from 'dotenv'

dotenv.config();
```

Использовать:
```js
process.env.FIELD
```
