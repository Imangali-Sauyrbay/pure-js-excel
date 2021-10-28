import { storage } from '@core/utils';

function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  const date = new Date(model.date);
  return `
  <li class="dashboard__record">
    <a href="#excel/${id}">${model.title}</a>
    <strong>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</strong>
  </li>`;
}

function getAllKeys() {
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key.includes('excel:')) continue;
    keys.push(key);
  }
  return keys;
}

export function createRecordsTable() {
  const keys = getAllKeys();
  if (!keys.length) {
    return `<p>У вас пока что нету Таблиц</p>`;
  }
  return `
    <div class="dashboard__list-header">
        <span>Название</span><span>Дата открытия</span>
    </div>

    <ul class="dashboard__list">
      ${keys.map(toHTML).join(' ')}
    </ul>
  `;
}
