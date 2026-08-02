import Page from "classes/Page";
import Button from "classes/Button";

export default class Home extends Page {
  constructor() {
    super({
      id: "home",
      element: ".home",
      elements: {
        navigation: document.querySelector(".navigation"),
        button: ".home__button",
        link: ".home__button__link",
      },
    });
  }

  create() {
    super.create();

    this.button = new Button({
      element: this.elements.button,
      elements: {
        link: this.elements.link,
      },
    });
  }
}
