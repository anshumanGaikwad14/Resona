import Animation from "classes/Animation";
import GSAP from "gsap";
import { each } from "lodash";
import { split, calculate } from "utils/text";

export default class Label extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });

    split({
      element: this.element,
      expression: " ",
      append: true,
    });

    split({
      element: this.element,
      expression: " ",
      append: true,
    });

    this.elementsLinesSpans = this.element.querySelectorAll("span span");
  }

  animateIn() {
    this.animationIn = GSAP.timeline({
      delay: 0.5,
    });
    this.animationIn.set(this.element, {
      autoAlpha: 1,
    });

    each(this.elementsLines, (Line, index) => {
      this.animationIn.fromTo(
        Line,
        {
          y: "100%",
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          delay: index * 0.2,
          duration: 1.5,
          ease: "expo.out",
        },
        0,
      );
    });
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0,
    });
  }

  onResize() {
    this.elementsLines = calculate(this.elementsLinesSpans);
  }
}
