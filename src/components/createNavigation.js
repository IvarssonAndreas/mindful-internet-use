import utilities from "../utilities";

export default (id, items, logoUrl) => new Navigation(id, items, logoUrl);

class Navigation {
  constructor(id, items, logoUrl) {
    this.navigation = document.getElementById(id);
    this.items = items;
    this.logoUrl = logoUrl;

    this.setupHtml();

    // set up hander
    this.navigation.addEventListener("click", this.navigationHandler);
  }

  navigationHandler(e) {
    const mainContent = document.querySelector(".main-content");

    const sideNavList = this.querySelector(".side-nav__list").children;

    if (!e.target.classList.contains("side-nav__item")) {
      return;
    }

    const sectionToActivate = e.target.getAttribute("data-section");

    for (let i = 0; i < sideNavList.length; i++) {
      if (sectionToActivate == sideNavList[i].getAttribute("data-section")) {
        sideNavList[i].classList.add("side-nav__item--active");
        mainContent.children[i].classList.remove("content--hidden");
      } else {
        sideNavList[i].classList.remove("side-nav__item--active");
        mainContent.children[i].classList.add("content--hidden");
      }
    }
  }

  setupHtml() {
    let html = `<h1 class="side-nav__logo"> >MIU</h1>`;


    html += '<ul class="side-nav__list">';
    for (let i = 0; i < this.items.length; i++) {
      const activeString = i === 0 ? "--active" : "";
      html += `
          <li data-section=
          ${this.items[i].section} class="side-nav__item side-nav__item${activeString}">
          ${this.items[i].text}
          </li>`;
    }

    html += "</ul>";
    html +=
      '<div class="side-nav__contacts"><a class="side-nav__link" href="https://chrome.google.com/webstore/detail/mindful-internet-use/hieolpjdilnibgamiafklnlcmagdngoo">I’d love to hear your feedback!</a></div>';
    this.navigation.innerHTML = html;
  }
}
