import Animation from "classes/Animation";
import GSAP from "gsap";
import { each } from "lodash";
import { split, calculate } from "utils/text";

export default class Hero extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });

    console.log(this.element);
  }

  animateIn() {
    this.animationIn = GSAP.timeline({
      delay: 0.5,
    });

    this.animationIn.fromTo(
      this.element,
      {
        scale: 1.2,
        autoAlpha: 0,
      },
      {
        scale: 1,
        autoAlpha: 1,
        duration: 1.5,
        ease: "expo.out",
      },
      0,
    );
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0,
    });
  }
}
