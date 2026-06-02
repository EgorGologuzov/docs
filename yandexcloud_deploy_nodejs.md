# Деплой проекта React + Express на виртуальную машину Yandex Cloud на примере проекта iQmenu

Гайд - https://www.youtube.com/watch?v=UaoRx_EmD70

## Создать SSH ключ

Создать новый SSH ключ при необходимости по инструкции

## Создание ВМ

1. Перейти в Yandex Cloud Console с подключенным платежным аккаунтом
2. Панель слева > Все сервисы > Compute Cloud
3. Создать ВМ с характеристиками:
- название: iqmenu
- ос: ubuntu 24.04
- зона доступности: ru-central1-b
- диск: hdd / ssd, 10-20 Gb
- вычислительные ресурсы: Intel Ice Lake, vCPU - 2, RAM - 1-2 Gb, Прерываемая
- сеть: автоматический публичный IP
- логин: egor
- ssh: имя ключа - egor, ключ - основной с ноута

> [!WARNING]
> Если нужно, чтобы IP адрес машины не менялся при каждом перезапуске ВМ, нужно сделать его статическим.
> Перейти в дашборд (все мои ресурсы) > Virtual Private Cloud > Публичные IP-адреса (панель слева) > Сделать статическим (три точки у нужного адреса)

## Подключение

Настроить SSH конфиг для подключения к ВМ
```
Host iqmenu-vm
    HostName 111.88.151.58
    User egor
    IdentityFile C:\Users\prog\.ssh\YandexCloud\gologuzovegor\ssh_key
```
и подключиться короткой командой
```
ssh iqmenu-vm
```
или подключиться напрямую
```
ssh -l egor 111.88.151.58
```

> [!NOTE]
> При первом подключении согласиться на подключение (ввести yes)

## Перед началом работы

```
sudo su -
sudo apt update
```

## Установка MongoDB

Найти установочный архив .tgz сервера Mongo для Ubuntu 24.04, можно скачать через VPN из https://www.mongodb.com/try/download/community

Найти установочный архив .tgz интерактивной консоли для Ubuntu 24.04, можно скачать через VPN https://www.mongodb.com/try/download/community

```
# подключаемся к машине по sftp использую ssh ключ
sftp iqmenu-vm

# создать директорию для загрузки, если нет
mkdir sftp

# перейти в директорию загрузки
cd sftp

# загрузить файлы
put "C:\Users\prog\Desktop\Installers\MongoDB\mongodb-linux-x86_64-ubuntu2204-6.0.28.tgz"
put "C:\Users\prog\Desktop\Installers\MongoDB\mongosh-2.8.3-linux-x64.tgz"

# дождаться окончания загрузки и выйти
exit

# подключиться к ВМ под рутом
ssh iqmenu-vm
sudo su -

# распаковываем архивы в нужную папку и переименовываем ее
tar -zxvf /home/egor/sftp/mongodb-linux-x86_64-ubuntu2204-6.0.28.tgz -C /www
tar -zxvf /home/egor/sftp/mongosh-2.8.3-linux-x64.tgz -C /www
cd /www
mv mongodb-linux-x86_64-ubuntu2204-6.0.28/ mongodb/
mv mongosh-2.8.3-linux-x64/ mongosh/

# копируем исполняемый файл оболочки в папку к серверу mongo И даем права на запуск
cp mongosh/bin/mongosh /www/mongodb/bin/

# создаем папку для баз данных mongo (по умолчанию mongo ищет папку с таким именем)
mkdir -p /data/db

# запускаем (должны появится логи в виде JSON и консоль будет занята этим процессом)
/www/mongodb/bin/mongod

CTRL + C чтобы завершить процесс

# в другом окне консоли проверить запуск оболочки (должен появится промпт test>)
/www/mongodb/bin/mongosh

exit чтобы завершить процесс
```

## Запуск сервиса MongoDB

Создать конфиг для монги

```
nano /www/mongodb/mongod.conf
```

Вставить и сохранить туда:

```
storage:
  dbPath: /data/db
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /www/mongodb/mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1
```

> [!INFO]
> СОХРАНИТЬСЯ В nano: CTRL + O > Enter, ВЫЙТИ: CTRL + X 

Создать системную службу

```
nano /etc/systemd/system/mongodb.service
```

Вставить и сохранить туда:

```
[Unit]
Description=MongoDB Database Server (Manual Install)
After=network.target

[Service]
User=root
ExecStart=/www/mongodb/bin/mongod --config /www/mongodb/mongod.conf
Restart=always

[Install]
WantedBy=multi-user.target
```

Настройка автозапуска

```
# Перезагружаем менеджер служб, чтобы он увидел наш новый файл
systemctl daemon-reload

# Включаем АВТОЗАПУСК службы при старте виртуальной машины
systemctl enable mongodb

# Запускаем базу данных прямо сейчас в фоновом режиме
systemctl start mongodb

# Проверка службы
systemctl status mongodb
```

## Установка node.js и npm

```
apt update
apt install nodejs
apt install npm
```
Проверка
```
node -v
npm -v
```

## Перенос проекта на сервер

```
cd /
mkdir www
cd www
git -v
git clone https://github.com/EgorGologuzov/iQmenu.git

# обновить репу
git pull
```

## Настройка прав доступа

Нужно выдать пользователю, от имени которого будут запускаться сервисы (в данном случае egor), права на все папки, в которые будут вестись запись во время работы приложения, например папки для картинок и файлов.

```
chown -R egor:egor /www/iQmenu/api/public/
chmod -R 755 /www/iQmenu/api/public/
```

## Пробный запуск API

> [!WARNING]
> Перед запуском бека нужно настроить и запустить службу MongoDB

```
cd /www/iQmenu/api
npm install
npm install -g nodemon          # глобальнос ставим сервер для запуска проекта
nano .env                       # скопировать содержимое и сохранить, проверить `ls -la`

# Создать папки, если нет
mkdir -p /www/iQmenu/api/public/images
mkdir -p /www/iQmenu/api/public/qrs

npm run seed                    # делаем посев

# Проверка данных в БД
/www/mongodb/bin/mongosh
use iqmenu
db.users.findOne()              # должен вывести документ одного пользователя из посева

# Запуск службы в консоли
npm run start

# Проверка доступности службы в браузере
http://111.88.151.58:4200/api/menu/1        # должен вернуть первое меню

CTRL + C                         # выход
```

## Запуск сервиса API

Создать файл с конфигом:

```
nano /etc/systemd/system/iqmenu-api.service
```

Содержимое:

```
[Unit]
Description=iQmenu API (Express.js)
After=network.target

[Service]
User=egor
WorkingDirectory=/www/iQmenu/api
ExecStart=/usr/bin/npm run prod
Restart=always
Environment=NODE_ENV=production
Environment=PATH=/usr/bin:/usr/local/bin
Environment=APP_RUN_PORT=4200

[Install]
WantedBy=multi-user.target
```

Активация автостарта и запуск:

```
systemctl enable iqmenu-api
systemctl start iqmenu-api
systemctl status iqmenu-api             # должно быть active, проверить логи на ошибки
```

Проверить работу службы: http://111.88.151.58:4200/api/menu/1

## Пробный запуск фронта

Собрать приложение на ПК в папку web/build:

```
cd web
npm run build
```

Коммит и пуш в репозиторий, вытянуть сборку на ВМ:

```
cd /www/iQmenu
git pull
```

Установить serve и проверить работу:

```
cd /www/iQmenu
npm install -g serve                # сервер для раздачи статики, ставим глобально
cd web
serve -s build -l 3000
```

Приверить работу: http://51.250.16.106:3000

> [!WARNING]
> Должен возвращать главную страницу и картинки, запросы к API могут если не работать, если в .env.production указан невреный API_BASE_URL

## Установка, запуск и настройка Nginx

Установка и запуск:

```
apt update
apt install nginx -y
systemctl enable nginx
systemctl start nginx
systemctl status nginx      # должно быть active
```

Настройка конфига:

```
nano /etc/nginx/sites-available/egor-gologuzov.online
```

Содержимое:

```
server {
    listen 80;
    server_name egor-gologuzov.online www.egor-gologuzov.online;

    # Макс размер файла
    client_max_body_size 20M;

    # Перенаправление всех HTTP-запросов на HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name egor-gologuzov.online www.egor-gologuzov.online;

    # SSL-сертификаты
    ssl_certificate /etc/letsencrypt/live/egor-gologuzov.online/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/egor-gologuzov.online/privkey.pem;

    # Статика фронтенда
    root /www/iQmenu/web/build;
    index index.html;

    # Макс размер файла
    client_max_body_size 20M;

    # Проксирование API-запросов на бекенд
    location /api {
        proxy_pass http://localhost:4200;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Все остальные запросы на фронтенд (React SPA)
    location / {
        try_files $uri /index.html;
    }

    # Кеширование статики
    location /static {
        expires 1y;
        add_header Cache-Control "public";
    }
}
```

Далее нужно активировать конфиг nginx, создав символическую ссылку:

```
ln -s /etc/nginx/sites-available/egor-gologuzov.online /etc/nginx/sites-enabled/

# удалить дефолтный конфиг
rm /etc/nginx/sites-enabled/default
```

Протестировать конфиг:

```
# тестирует полную сборку конфига (все sites-enabled + глобальный), должен быть successful
nginx -t
```

## Настройка HTTPS

```
apt install certbot python3-certbot-nginx -y
systemctl stop nginx                                                      # остановлиаем nginx
certbot --nginx -d egor-gologuzov.online -d www.egor-gologuzov.online     # все ответы yes
```

Последняя команда запустит nginx в обход сервиса.

> [!IMPORTANT]
> Перезагрузить машину, чтобы запустился сервис nginx.

## Проверка работы

Проверить, что IP домена верный
```
ping egor-gologuzov.online
```

Если IP неверный попробовать `ipconfig /flushdns` на клиентсокм ПК, если не помогло, значит адрес закеширован где-то в сети, поможет только ждать 24-48 часов до обновления кэша или подключиться к другой сети

Если адрес верный, проверить `https://egor-gologuzov.online`, должна открыться главная страница сайта по HTTPS

## Настроить фаервол

Закрыть все, кроме SSH, SFTP, HTTP, HTTPS

```
# проверить наличие фаервола
ufw status verbose

# запрещаем все входящие соединения и разрешаем все исходящие
ufw default deny incoming
ufw default allow outgoing

# открываем только нужные порты на вход
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp

# включить фаервол (все yes)
ufw enable

# проверить список активных правил
ufw status numbered
```
