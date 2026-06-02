# Создание SHH ключей и настройка конфига

### 1. Генерация SSH ключей
```
// Создать папку для SSH
mkdir C:\Users\{WindowsUserName}\.ssh\{ServiceName}\{AccountName}

// Сгенерировать SSH ключ (пароль оставить пустым)
ssh-keygen -f C:\Users\{WindowsUserName}\.ssh\{ServiceName}\{AccountName}\ssh_key
```

> [!WARNING]
> Предоставлять по запросу сервиса можно только публичный ключи (файл .pub), секретный ключ нужно держать в секрете

### 2. Настройка ssh config

Настройте config под вашы нужды, например, в файл `~/.ssh/config` добавить:

```
# Для Github по умолчанию
Host github.com
    HostName github.com
    User git
    IdentityFile C:\Users\{WindowsUserName}\.ssh\GitHub\EgorGologuzov\ssh_key
    IdentitiesOnly yes

# Для Gitnub дополнительного аккаунта
Host GitHub-EgorGologuzov
    HostName github.com
    User git
    IdentityFile C:\Users\{WindowsUserName}\.ssh\GitHub\EgorGologuzov\ssh_key
    IdentitiesOnly yes

# Для YandexCloud удаленной ВМ
Host iqmenu-vm
    HostName 111.88.151.58
    User egor
    IdentityFile C:\Users\{WindowsUserName}\.ssh\YandexCloud\gologuzovegor\ssh_key
```