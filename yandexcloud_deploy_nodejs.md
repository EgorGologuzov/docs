# Деплой проекта React + Express на виртуальную машину Yandex Cloud на примере проекта iQmenu

Гайд - https://www.youtube.com/watch?v=UaoRx_EmD70

## Создание ВМ

- название: iqmenu
- ос: ubuntu 24.04
- зона доступности: ru-central1-b
- диск: hdd, 10 Gb
- вычислительные ресурсы: Intel Ice Lake, vCPU - 2, RAM - 1 Gb, Прерываемая
- сеть: автоматический публичный IP
- логин: egor
- ssh: имя ключа - egor, ключ - основной с ноута

## Подключение

```
ssh -l egor 51.250.16.106
```

## Перед началом работы

```
sudo su -
```

## Перенос проекта на сервер

```
cd /
mkdir www
cd www
git -v
git clone https://github.com/EgorGologuzov/iQmenu.git
```

## Настройка прав доступа

Нужно выдать главному пользователю (в данном случае egor) права на все папки, в которые будут вестись запись во время работы приложения, например папки для картинок и файлов.

```
chown -R egor:egor /www/iQmenu/api/public/
chmod -R 755 /www/iQmenu/api/public/
```

## Установка node.js и npm

```
apt update
apt install nodejs
apt install npm
```

## Пробный запуск бека

```
cd /
cd www/iQmenu/api
npm i
npm install -g nodemon
nano .env                         # Заполнить нужными параметрами и сохранить
nodemon src/index.js
```

Приверить работу: http://51.250.16.106:4200/api/menu/1

## Пробный запуск фронта

Собрать приложение локально в папку web/build и загрузить на сервер.

```
cd /
cd www/iQmenu
npm install -g serve
cd web
serve -s build -l 3000
```

Приверить работу: http://51.250.16.106:3000

## Настройка сервиса для бека

Создать файл с конфигом:

```
cd /etc/systemd/system
nano iqmenu-backend.service
```

Содержимое:

```
[Unit]
Description=iQMenu Backend (Express.js)
After=network.target

[Service]
User=egor
WorkingDirectory=/www/iQmenu/api
ExecStart=/usr/bin/npm run start
Restart=always
Environment=NODE_ENV=production
Environment=PATH=/usr/bin:/usr/local/bin
Environment=APP_RUN_PORT=4200

[Install]
WantedBy=multi-user.target
```

Активация автостарта и запуск:

```
systemctl enable iqmenu-backend
systemctl start iqmenu-backend
systemctl status iqmenu-backend # должно быть active, проверить логи на ошибки
```

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
cd /etc/nginx/sites-available
nano egor-gologuzov.ru
```

Содержимое:

```
server {
    listen 80;
    server_name egor-gologuzov.ru www.egor-gologuzov.ru;

    # Макс размер файла
    client_max_body_size 20M;

    # Перенаправление всех HTTP-запросов на HTTPS
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    server_name egor-gologuzov.ru www.egor-gologuzov.ru;

    # SSL-сертификаты
    ssl_certificate /etc/letsencrypt/live/egor-gologuzov.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/egor-gologuzov.ru/privkey.pem;

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

ПОКА КОНФИГ НЕ АКТИВИРУЕМ!

## Настройка HTTPS

```
apt install certbot python3-certbot-nginx -y
systemctl stop nginx                                              # остановлиаем nginx
certbot --nginx -d egor-gologuzov.ru -d www.egor-gologuzov.ru     # все ответы yes
```

Последняя команда запустит nginx в обход сервиса. Чтобы запустился сервис nginx нужно перезапустить машину.