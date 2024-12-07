# Создание проекта React

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

## Запуск для тестирования
```
cd web
npm run start
```