- [Создание проекта с нуля](#создание-проекта-react-с-нуля)
- [Старт из склонированного репозитория](#старт-из-склонированного-репозитория)

# Создание проекта React с нуля

## Установка node.js:

1. Скачиваем установщик
2. (next > next > ... > install, перезагрузка)

## Проверка версии
```
node -v
```
## Создать проект
```
npx create-react-app .
```
или
```
npx create-react-app my-app
```
**Если ошибка:**
```
npm error code ENOENT
npm error syscall lstat
npm error path C:\Users\Egor\AppData\Roaming\npm
npm error errno -4058
npm error enoent ENOENT: no such file or directory, lstat 'C:\Users\Egor\AppData\Roaming\npm'
npm error enoent
npm error A complete log of this run can be found in: C:\Users\Egor\AppData\Local\npm-cache\_logs\2024-10-11T13_52_29_106Z-debug-0.log
```

**Решение:**
```
npm install npm -g
```
Повторная попытка создать проект успешна

**Если проблема с установкой пакетов:**

Смотри [react_nodejs_work.md](react_nodejs_work.md)

## Убрать лишние зависимости

1. В файле package.json оставить минимальный набор зависимостей

```json
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "react-scripts": "5.0.1"
  },
```
2. Удалить папку node_modules и файл package-lock.json
3. Удалить упоминания reportWebVitals из index.js
3. Обновить зависимости
```
npm install
```

Удалить все лишние файлы из /src и /public

## Запуск для тестирования
```
cd web
npm run start
```

## Ошибки при запуске

**Ошибка:**

```
One of your dependencies, babel-preset-react-app, is importing the
"@babel/plugin-proposal-private-property-in-object" package without
declaring it in its dependencies. This is currently working because
"@babel/plugin-proposal-private-property-in-object" is already in your
node_modules folder for unrelated reasons, but it may break at any time.

babel-preset-react-app is part of the create-react-app project, which is not maintained anymore. It is thus unlikely that this bug will
ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to
your devDependencies to work around this error. This will make this message
go away.
```

**Решение**

Добавление пакета `@babel/plugin-proposal-private-property-in-object` в зависимости

```
npm install --save-dev @babel/plugin-proposal-private-property-in-object
```

**Ошибка в консоли браузера:**

```
Manifest: Line: 1, column: 1, Syntax error.
```

**Решение**

Удалить `<link>` с манифестом в /public/index.html

## Установка React Router:

```
npm i react-router
```

## Установка Material UI:

Сама библиотека:
```
npm install @mui/material @emotion/react @emotion/styled
```
Щрифт:
```
npm install @fontsource/roboto
```
В index.js вставить:
```
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```
Иконки:
```
npm install @mui/icons-material
```

# Старт из склонированного репозитория

## Установить недостающие зависимости из package.json

(в том числе при первом запуске проекта, склонированного из репозитория):

```
npm install
```

## Если проблема с установкой пакетов:
```
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: felix-groom@0.1.0
npm error Found: react@19.0.0
npm error node_modules/react
```

**Решение:**
```
npm install @react-google-maps/api --legacy-peer-deps
```
`@react-google-maps/api` заменить на имя пакета

Повторная попытка установки пакета успешна