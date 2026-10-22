import fs from "node:fs";
import path from "node:path";
import { resolve } from "../3/resolve.js";

/**
 * Примерный алгоритм работы бандлера:
 * 1. Прочитать entry и собрать список всех вызовов require
 * 2. Пройтись по полученным require (они могут быть вложенными)
 * 3. На выходе получится массив с исходным кодом всех модулей
 * 4. Склеить всё воедино обернув модули и entry в новый рантайм
 *
 * Для чтения файлов используйте fs.readFileSync
 * Для резолва пути до модуля испльзуйте path.resolve (вам нужен путь до родителя где был вызван require)
 * Пока что сборщик упрощен, считаем что require из node_modules нет
 */

/**
 * @param {string} entryPath - путь к entry бандлинга
 */
export function bundle(entryPath) {
  const modules = new Map();
  const visit = (modulePath) => {
    if (modules.has(modulePath)) return;
    const file = fs.readFileSync(modulePath, "utf-8");
    const dependencies = {};
    modules.set(modulePath, { code: file, dependencies });
    const deps = searchRequireCalls(file);

    deps.forEach((item) => {
      const itemPath = resolve(item, modulePath);
      if (itemPath === null) {
        throw new Error(`Не удалось найти "${item}" из "${modulePath}"`);
      }
      dependencies[item] = itemPath;
      visit(itemPath);
    });
  };

  visit(path.resolve(entryPath));
  const stringResult = [...modules]
    .map(([id, data]) => {
      return `
            ${JSON.stringify(id)}: {
              factory: function(require, module, exports) {
                ${data.code}
              },
              dependencies: ${JSON.stringify(data.dependencies)}
            }
            `;
    })
    .join(",\n");
  return `
(function() {
  const modules = { ${stringResult} };

  const cache = new Map()

  function load(id) {
    if (cache.has(id)) {
      return cache.get(id).exports;
    }
    const record = modules[id];
    const smth = { exports: {} };
    cache.set(id, smth)
    const localRequire = (request) => {
      const dependencyId = record.dependencies[request];
      return load(dependencyId);
    };

    record.factory(localRequire, smth, smth.exports);
    return smth.exports;
  }

  load(${JSON.stringify(path.resolve(entryPath))});
})();
`;
}

/**
 * Функция для поиска в файле вызовов require
 * Возвращает id модулей
 * @param {string} code
 */
function searchRequireCalls(code) {
  return [...code.matchAll(/require\(('|")(.*)('|")\)/g)].map(
    (item) => item[2],
  );
}
