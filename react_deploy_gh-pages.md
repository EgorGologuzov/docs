# Деплой React приложения на gh-pages

[Видео гайд](https://www.youtube.com/watch?v=Q9n2mLqXFpU)

> [!IMPORTANT]
> Все относительные пути на картинки в проекте должны начинаться с `/REPO_NAME/`

Например, если картинки лежат в папке `/public/img` можно реализовать такую утилиту:
```jsx
export function imgPath(filename) {
  let result = "/REPO_NAME/img/" + filename;
  result = result.replace("//", "/");
  return result;
}
```

`REPO_NAME` заменить на имя репозитория и использовать по всему проекту вот так:
```jsx
<img src={imgPath("filename.png")} />
```

> [!IMPORTANT]
> Если используется react router то нужно чтобы все пути начинались с `/REPO_NAME/`

Можно реализовать так:
```jsx
<BrowserRouter>
  <Routes>
    <Route index element={<Navigate to="/REPO_NAME/home" />} />
    <Route path="/REPO_NAME" element={<Layout />}>
      <Route index element={<Navigate to="home" />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
    </Route>
    <Route path="*" element={<h1>Страница не найдена</h1>} />
  </Routes>
</BrowserRouter>
```

В девелопменте это тоже будет работать без проблем.

## Алгоритм

### 1. Установить gh-pages пакет
```
npm install gh-pages --save-dev --legacy-peer-deps
```

### 2. Изменить package.json

Добавить `homepage` в самый верх, заменить GIT_HUB_USERNAME, REPO_NAME на значения имени пользователя github и имени репозитория

```
{
  "homepage": "http://GIT_HUB_USERNAME.github.io/REPO_NAME",
  
  "name": "felix-groom",
  "version": "0.1.0",
  ...
```

Добавить скрипты predeploy и deploy

```
  "scripts": {
    "start": "react-scripts start",

    "predeploy": "npm run build",
    "deploy": "gh-pages -d build",

    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ...
```

### 3. Сохранить и закоммитить изменения

### 4. Деплой

```
npm run deploy
```

## Обновление

### 1. Внести изменнеия и закомитить на GitHub

### 2. Обновить
```
npm run deploy
```
