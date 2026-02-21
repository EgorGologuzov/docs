# Работа с Git, GitHub

## Первоначальная настройка git:

### 1. Генерация SSH ключей
```
// Создать папку для SSH
mkdir C:\Users\Egor\.ssh\GitHub\EgorGologuzov

// Сгенерировать SSH ключ (пароль оставить пустым)
ssh-keygen -f C:\Users\Egor\.ssh\GitHub\EgorGologuzov\ssh_key
```

### 2. Настройка ssh config

В файл `~/.ssh/config` добавить:

```
# Github account default
Host github.com
    HostName github.com
    User git
    IdentityFile C:\Users\Egor\.ssh\GitHub\EgorGologuzov\ssh_key
    IdentitiesOnly yes

# Github account EgorGologuzov
Host GitHub-EgorGologuzov
    HostName github.com
    User git
    IdentityFile C:\Users\Egor\.ssh\GitHub\EgorGologuzov\ssh_key
    IdentitiesOnly yes
```

### 3. Добавить ssh ключ к GitHub аккаунту

GitHub account > Settings > SSH and GPG keys > New SSH key

Проверить подключение:
```
ssh -T git@GitHub-EgorGologuzov
yes // при первом подключении

Hi EgorGologuzov! You've successfully authenticated, but GitHub does not provide shell access. // подключение успешно
```

### 4. Базовая настройка git (глобально)

```
git config --global user.name "EgorGologuzov"
git config --global user.email "gologuzovegor@gmail.com"
git config --global init.defaultBranch main
```

### 5. Настройка репозитория

Установить корректный URL для origin, чтобы можно было пушить:
```
git remote set-url origin git@GitHub-EgorGologuzov:EgorGologuzov/docs.git
```

### 6. Клинорвание репозитория

Если нужна авторизация в дефолтном аккаунте ssh
```
git clone git@github.com:EgorGologuzov/docs.git
```

Если нужна авторизация в конкретном аккаунте ssh
```
git clone git@GitHub-EgorGologuzov:EgorGologuzov/docs.git
```

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
> Форк - твоя личная копия чужой репы на GitHub
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
