# Работа с React + Node.js

## Установить недостающие зависимости из package.json

(в том числе при первом запуске проекта, склонированного из репозитория):

```
npm install
```

## Если проблема с установкой пакетов:
```
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: felix-groom@0.1.0
npm error Found: react@19.0.0
npm error node_modules/react
```

**Решение:**
```
npm install @react-google-maps/api --legacy-peer-deps
```
`@react-google-maps/api` заменить на имя пакета

Повторная попытка установки пакета успешна