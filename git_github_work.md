# Работа с Git, GitHub

## Начало проекта:
### 1. Создать репозиторий
```
// Созадть папку проекта
cd <путь к папке проекта>
git init
git add --all
git status // проверяем, что все добавилось
git commit -m "Init"

// Создать репозиторий в VCS
git remote add origin https://github.com/[User]/[Repos].git
git push -u origin master
```

### 2. Настройка ветки dev
```
// Создать ветку dev в репозитории в VCS (GitHub: репозиторий > branches > new branch)
git branch dev
git switch dev
git branch --all // просмотреть список веток
git branch --set-upstream-to=origin/dev dev
git pull
```

## Создание форка:
>Форк - твоя личная копия чужой репы на GitHub
1. Зайти на страницу оригинального репозитория
2. Справа сверху Fork > стрелочка > create new fork
3. Ничего не меняешь > кнопка Create
4. Можно клонировать, делать свои задачи, создавать какие хочешь ветки и файлы

## Клонирование:
```
cd <путь, куда клонировать репу>
git clone https://github.com/[User]/[Repos].git
```

## Внесение изменений в свой репозиторий:
```
// вносишь изменения локально
git add -all
git commit -m "Message text"
git pull
git push
```

## Создание запроса на слияние:

1. Открываешь свой форк
2. (Необязательно) Подтягивание изменений из основного репозитория, нажимая "Sync fork" 
3. Contribute > Open pull request
4. Даешь название
5. Отправляешь
6. Ждешь пока владелец посмотрит и смерджит или напишет что не так
