import Page from "classes/Page";
import Button from "classes/Button";

export default class Detail extends Page {
  constructor() {
    super({
      id: "detail",
      element: ".product",
      elements: {
        button: ".product__details__info__button",
        link: ".product__details__info__button__buy",
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
