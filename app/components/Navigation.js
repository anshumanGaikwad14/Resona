import Component from "classes/Component";
import GSAP from "gsap";

import { COLOR_SECONDARY_BLACK, COLOR_PRIMARY_WHITE } from "utils/color";

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: ".navigation",
      elements: {
        items: ".navigation__list__item",
        links: ".navigation__list__item__link",
      },
    });

    this.onChange(template);
  }

  onChange(template) {
    if (template === "home" || template === "detail") {
      GSAP.to(this.element, {
        color: COLOR_PRIMARY_WHITE,
        duration: 1.5,
        ease: "expo.out",
      });
    } else {
      GSAP.to(this.element, {
        color: COLOR_SECONDARY_BLACK,
        duration: 1.5,
        ease: "expo.out",
      });
    }

    if (template === "about") {
      GSAP.to(this.elements.links[0], {
        autoAlpha: 0,
        duration: 0.75,
        ease: "expo.out",
      });

      GSAP.to(this.elements.links[1], {
        autoAlpha: 1,
        duration: 0.75,
        delay: 0.75,
        pointerEvents: "auto",
        ease: "expo.out",
      });
    } else {
      GSAP.to(this.elements.links[1], {
        autoAlpha: 0,
        duration: 0.75,
        ease: "expo.out",
      });

      GSAP.to(this.elements.links[0], {
        autoAlpha: 1,
        duration: 0.75,
        delay: 0.75,
        ease: "expo.out",
      });
    }
  }
}
