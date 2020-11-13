import {htmlToElement} from '../utilities';

export default {
  addItem: (inputList) => {
    const newIndex = inputList.children.length;
    const li = htmlToElement(
      `<li
         class="input-list__item" 
         data-index = "${newIndex}">
         <input class="input-list__item-input" type=text>
         <button class="input-list__remove-btn">
         </button>
         </li>`,
    );
    inputList.appendChild(li);
    li.querySelector('.input-list__item-input').focus();
  },
  render: (items, inputList) => {
    if (!items) {
      return;
    }
    let html = '';
    for (let i = 0; i < items.length; i++) {
      html += `
              <li class="input-list__item" 
              data-index = "${i}">
              <input class="input-list__item-input" 
              value="${items[i]}" type=text>
              <button class="input-list__remove-btn"></button>
              </li>`;
    }

    inputList.innerHTML = html;
  },
  update: (event, storageKey, removeFunction, callbackAfterSetStorage, inputList) => {
    if (event.type != 'focusout' || !event.target.classList.contains('input-list__item-input')) {
      return;
    }

    const index = event.target.parentNode.getAttribute('data-index');
    if (event.target.value.trim() === '') {
      removeFunction(event);
      return;
    }

    chrome.storage.sync.get([storageKey], (result) => {
      const elements = inputList.children;

      const items = result[storageKey] ? result[storageKey] : [];

      if (elements.length == items.length) {
        items[index] = event.target.value;
      } else {
        items.push(event.target.value);
      }

      chrome.storage.sync.set({ [storageKey]: items }, () => {
        callbackAfterSetStorage(items);
      });
    });
  },
};
