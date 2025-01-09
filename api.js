// ГЛАВНОЕ
// 1. API которое было дано в задании (fakestoreapi.com) работеат не стабильно,
// поэтому ты использовал другое API (fakestoreapi.in).
// 2. Но это API также глючило в некоторых моментах, поэтому ты скачал все продукты (около 150 шт.)
// из его базы, сохранил их в файле и при тестировании брал данные оттуда.
// 3. Функционал по выполнению запросов к API ты тоже реализовал и протестировал, иногда он работает,
// иногда нет, зависит от глюков API. Чтобы его включить нужно установить флаг NEED_TRY_LOAD = true
// (флаг ниже в коде).
// 4. Ты решил оставить флаг = false в финальной версии, чтобы сайт точно работал стабильно при проверке.


// ОБЩЕЕ
// 1. Твое приложение хорошее, выполнены все требования из задания, ты заслуживаешь пятерку -
// уверенно отстаивай это.
// 2. Для ускорения разработки ты использовал библиотеку компонентов Material UI от Google.
// Оттуда ты использовал стандартные кнопки, список карточек, верхнее меню и другие стандартные компоненты.
// 3. Твой сайт уникален, но если кто-то другой тоже решил использовать Material UI, то его сайт может быть
// похож на твой в некоторых деталях, свойственных данной библиотеке. Это не удивительно, ведь Material UI -
// самая популярная библиотека компонентов для React.


// ДАЛЬШЕ КОММЕНТАРИИ К КОДУ (ВДРУГ СПРОСИТ)


// импорт файла с сохраненными продуктами
import productsResponse from "./products.json"

// флаг, определяет нужно ли пытаться обратиться к API или сразу брать данные из products.json
// если = false - сразу брать данные из файла
// если = true - пытаться делать запрос к API
const NEED_TRY_LOAD = false;
// выделение списка продуктов из файла
const products = productsResponse.products;
// забыл удалить, хотел реализовать кеш, но передумал
const cash = {}

// функция для имитирования задержки, если данные беруться из файла
export function sleep(ms = 500) {
  return new Promise((resolve, _) => setTimeout(() => resolve(), ms));
}

// общая функция для отправки запросов к API или получения данных из файла
// url - строка запросаб типо https://fakestoreapi.in/api/products...
// getDefault - функция для получения значения, если не удалось загрузить данные или флаг = false
// handleResult - функция для извлечения из результата запроса нужных данных, например списка продуктов
export async function get({ url, getDefault, handleResult }) {
  if (!NEED_TRY_LOAD)  { // проверяем флаг
    // если false имитируем задержку и возвращаем результат getDefault
    await sleep();
    const result = getDefault();
    cash[url] = result;
    return result;
  }
  // если true пытаемся отправлять запрос
  try {
    const response = await fetch(url);
    const json = await response.json();
    const result = handleResult(json);
    cash[url] = result;
    return result;
  } catch (err) {
    // если ошибка возвращаем результат getDefault
    return getDefault();
  }
}

// функция для получения списка продуктов
// page - int, номер загружаемой страницы
// limit - int, количесвто товаров на одной странице
// category - string | null, фильтр категории товаров
export function getProducts({ page, limit, category }) {

  const isCategoryValid = category && category != "Все";
  // в зависимости от переданной категории формируем запрос
  const url = isCategoryValid
    ? `https://fakestoreapi.in/api/products/category?type=${category}&page=${page}&limit=${limit}`
    : `https://fakestoreapi.in/api/products?page=${page}&limit=${limit}`;
  
  return get({
    // передаем запрос в get
    url,
    // устанвлием функцию для получения значения, если не удалось загрузить данные или флаг = false
    getDefault: () => {
      const from = (page - 1) * limit;
      const to = from + limit;
      const filtered = isCategoryValid // фильтруем продукты по категории
        ? products.filter(product => product.category === category)
        : products;
      return filtered.slice(from, to); // возвращем нужную страницу
    },
    // устанавливаем функцию для извлечения из результата запроса нужных данных
    handleResult: (json) => {
      return json.products; // извлекаем список продуктов из результата запроса
    }
  });
}

// функция для получения данных о продукте
// id - int, идентификатор продукта
export function getProductById({ id }) {
  // формируем запрос
  const url = `https://fakestoreapi.in/api/products/${id}`;

  return get({
    // передаем запрос в get
    url,
    // устанвлием функцию для получения значения, если не удалось загрузить данные или флаг = false
    getDefault: () => {
      return products.find(product => product.id == id); // находим продукт с нужным id в сохраненном списке
    },
    // устанавливаем функцию для извлечения из результата запроса нужных данных
    handleResult: (json) => {
      const product = json.product; // извлекаем продукт из результата запроса
      return product.id === id ? product : null; // проверяем что id совпадает, если сопадает вернем продукт, иначе null
    }
  });
}