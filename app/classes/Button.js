import Component from "classes/Component";
import GSAP from "gsap";
import { COLOR_PRIMARY_WHITE, COLOR_PRIMARY_LIGHT } from "utils/color";

export default class Button extends Component {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  onMouseEnter() {
    GSAP.to(this.element, {
      backgroundColor: COLOR_PRIMARY_WHITE,
      duration: 1.5,
      ease: "expo.out",
    });
    GSAP.to(this.elements.link, {
      color: COLOR_PRIMARY_LIGHT,
      duration: 1.5,
      ease: "expo.out",
    });
  }

  onMouseLeave() {
    GSAP.to(this.element, {
      backgroundColor: "rgba(255, 252, 245, 0.05)",
      duration: 1.5,
      ease: "expo.out",
    });

    GSAP.to(this.elements.link, {
      color: COLOR_PRIMARY_WHITE,
      duration: 1.5,
      ease: "expo.out",
    });
  }

  addEventListeners() {
    this.onMouseEnterEvent = this.onMouseEnter.bind(this);
    this.onMouseLeaveEvent = this.onMouseLeave.bind(this);

    this.element.addEventListener("mouseenter", this.onMouseEnterEvent);
    console.log("hey");
    this.element.addEventListener("mouseleave", this.onMouseLeaveEvent);
  }

  removeEventListeners() {
    this.element.removeEventListener("mouseenter", this.onMouseEnter);
    this.element.removeEventListener("mouseleave", this.onMouseLeave);
  }
}
