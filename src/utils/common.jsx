export const shuffle = (arr) => {
   return [...arr].sort(() => 0.5 - Math.random())
}

export const buildUrl = (url, params) => {
   let urlWithParams = url;

   Object.entries(params).forEach(([key, value], i) => {
      const sign = !i ? "?" : "&";
      urlWithParams += `${sign}${key}=${value}`;
   });

   return urlWithParams;
}

// Этот код - это функция JavaScript, которая создает URL с параметрами запроса.Вот что делает каждая часть:

// - `buildUrl` - это имя функции.Она принимает два аргумента: `url` и`params`.
// - `url` - это базовый URL, к которому будут добавлены параметры.
// - `params` - это объект, содержащий пары ключ - значение, которые будут преобразованы в параметры запроса.
// - `Object.entries(params).forEach(([key, value], i) => {...});` - это цикл, который проходит через каждую пару ключ - значение в объекте`params`.
// - `const sign = !i ? "?" : "&";` - это условное выражение, которое определяет, какой знак использовать перед параметром.
//       Если это первый параметр(`i` равно 0), то перед параметром ставится знак вопроса(`?`).
//       Для всех последующих параметров используется знак амперсанда(`&`).
// - `urlWithParams += `${ sign }${ key }=${ value } `` - это строка, которая добавляет параметр и его значение к URL.
// - `return urlWithParams;` - это возвращает итоговый URL с параметрами запроса.

// В итоге, если вы вызовете`buildUrl('https://example.com', { a: 1, b: 2 })`, функция вернет`'https://example.com?a=1&b=2'`.
// Это полезно, когда вам нужно создать URL с параметрами запроса на основе объекта данных.


export const sumTotalPrice = (arr) => {
   return arr.reduce((prev, curr) => prev + curr, 0);
}