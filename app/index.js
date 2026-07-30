import { each } from "lodash";
import About from "pages/About";
import Collections from "pages/Collections";
import Detail from "pages/Detail";
import Home from "pages/Home";

import Preloader from "components/Preloader";

class App {
  constructor() {
    this.createPreloader();
    this.createContent();
    this.createPages();
    this.addLinkListener();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once("Completed", this.onPreloaded.bind(this));
  }

  createContent() {
    this.content = document.querySelector(".content");
    this.template = this.content.getAttribute("data-template");
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    this.page.show();
  }

  onPreloaded() {
    this.preloader.destroy();
  }

  async onChange(url) {
    await this.page.hide();

    const request = await window.fetch(url);
    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");

      div.innerHTML = html;

      const divContent = div.querySelector(".content");

      this.template = divContent.getAttribute("data-template");

      this.content.setAttribute("data-template", this.template);

      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();

      this.addLinkListener();
    } else {
      console.log("error");
    }
  }

  addLinkListener() {
    const links = document.querySelectorAll("a");

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();

        const { href } = link;

        console.log(href);

        this.onChange(href);
      };
    });
  }
}

new App();
