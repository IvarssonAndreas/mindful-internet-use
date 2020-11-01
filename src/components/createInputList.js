import {htmlToElement} from '../utilities';

export default (id, storageKey, callbackAfterSetStorage) => new InputList(id, storageKey, callbackAfterSetStorage);

class InputList {
  constructor(id, storageKey, callbackAfterSetStorage = () => { }) {


    this.container = document.getElementById(id);
    this.list = this.setupHTML();
    this.storageKey = storageKey;
    this.callbackAfterSetStorage = callbackAfterSetStorage;

    // event handlers
    this.container.addEventListener('focusout', (e) => {
      this.updateHandler(e);
    });
    this.container.addEventListener('click', (e) => {
      this.removeHandler(e);
    });
    this.container.addEventListener('click', (e) => {
      this.newItemHandler(e);
    });

    this.render();
  }

  render() {
    chrome.storage.sync.get([this.storageKey], (result) => {
      const items = result[this.storageKey];
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

      this.list.innerHTML = html;
    });
  }

  updateHandler(event) {
    if (event.type != 'focusout' || !event.target.classList.contains('input-list__item-input')) {
      return;
    }

    const index = event.target.parentNode.getAttribute('data-index');
    if (event.target.value.trim() === '') {
      this.removeHandler(event);
      return;
    }

    chrome.storage.sync.get([this.storageKey], (result) => {

      const elements = this.list.children;
      const items = result[this.storageKey] ? result[this.storageKey] : [];

      if (elements.length == items.length) {
        items[index] = event.target.value;
      } else {
        items.push(event.target.value);
      }

      chrome.storage.sync.set({ [this.storageKey]: items }, () => {
        typeof this.callbackAfterSetStorage === 'function' && this.callbackAfterSetStorage(items);
        this.render();
      });
    });
  }

  removeHandler(event) {
    if (event.type === 'click' && !event.target.classList.contains('input-list__remove-btn')) {
      return;
    }
    const item = event.target.parentNode;
    const index = item.getAttribute('data-index');
    this.removeIndex(index);
  }

  newItemHandler(e) {
    if (!e.target.classList.contains('input-list__add-btn')) {
      return;
    }
    this.addItem();
  }

  setupHTML() {
    this.container.innerHTML = `
      <ul class="input-list__list" >
      </ul>
      <div>
          <button 
          class="input-list__add-btn">
          Add
          </button>
      </div>`;

    return this.container.children[0];
  }

  addItem() {
    const index = this.list.children.length;
    const li = htmlToElement(this.getHtmlStringItem('', index));
    this.list.appendChild(li);
    li.querySelector('.input-list__item-input').focus();
  }

  getHtmlStringItem(value, index) {
    return `
        <li class="input-list__item" 
        data-index = "${index}">
        <input class="input-list__item-input" 
        value="${value}" type=text>
        <button class="input-list__remove-btn"></button>
        </li>`;
  }

  removeIndex(index) {
    chrome.storage.sync.get([this.storageKey], (result) => {
      if (!result[this.storageKey]) {
        return;
      }

      result[this.storageKey].splice(index, 1);
      chrome.storage.sync.set({ [this.storageKey]: result[this.storageKey] }, () => {
        typeof this.callbackAfterSetStorage === 'function'
          && this.callbackAfterSetStorage(result[this.storageKey]);
        this.render();
      });
    });
  }
}
