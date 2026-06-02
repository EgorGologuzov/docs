# Работа с терминалом Linux

Получить суперпользователя `sudo su -`

Перейти в корень `cd /`

Перейти назад `cd ..`

Перейти в папку `cd /absolute/or/local/foldername`

Создать папку `mkdir folder-name`

Удалить папку с файлами `rm -rf /path/to/folder`

## Сервисы

Включить автозапуск `systemctl enable service-name`

Выключить автозапуск `systemctl disable service-name`

Включить сейчас `systemctl start service-name`

Выключить сейчас `systemctl stop service-name`

Проверить состояние `systemctl status service-name`

Просмотреть логи `journalctl -u service-name`

Просмотреть логи в прямом эфире `journalctl -u service-name -f`