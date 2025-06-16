# Начало проекта FastAPI

> [!WARNING]
> Чтобы не было проблем с виртуальным окружением нужно включать режим командной строки в VScode (подефолту там powershell) или работать из командной строки

Создание виртуального окружения:
```
python -m venv venv  
```

Запуск виртуального окружения:
```
venv\Scripts\activate
```

Установка стандартного пакета для работы с FastAPI:
```
pip install "fastapi[standard]"
```

Запуск приложения:
```
fastapi dev main.py
```
или
```
uvicorn main:app --reload
```
