# Деплой проекта Vue на Github Pages

1. В файле vue.config.js добавить publicPath (заменить REPO_NAME на имя репозитория):
```js
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "/REPO_NAME/" : "/",
};
```

> [!WARNING]
> Если в проекте используются относительные пути к файлам, например к изображениям, нужно не забыть включить /REPO_NAME/ в эти пути.

2. Собрать проект
```
npm run build
```

3. Закоммитить и залить репозиторий на GitHub

4. Залить содержимое папки dist в ветку gh-pages (ветку создавать вручную не нужно)
```
git subtree push --prefix dist origin gh-pages
```

5. Проверить что pages запустились на ветке gh-pages, подождать обновления несколько минут


# Обновление сборки


1. Собрать проект
```
npm run build
```

2. Закоммитить и залить репозиторий на GitHub

3. Синхронизировать dist с веткой gh-pages
```
git subtree push --prefix dist origin gh-pages
```

4. Подождать несколько минут