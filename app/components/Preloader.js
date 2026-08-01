import { each } from "lodash";
import GSAP from "gsap";
import { split } from "utils/text";
import Component from "classes/Component";

export default class Preloader extends Component {
  constructor() {
    super({
      element: ".preloader",
      elements: {
        title: ".preloader__text",
        number: ".preloader__number",
        numberText: ".preloader__number__text",
        images: document.querySelectorAll("img"),
      },
    });

    split({
      element: this.elements.title,
      expression: "<br>",
    });

    split({
      element: this.elements.title,
      expression: "<br>",
    });

    this.elements.titleSpans = document.querySelectorAll("span span");

    this.createLoader();

    this.length = 0;
  }

  createLoader() {
    console.log(this.elements.images);

    each(this.elements.images, (element) => {
      element.onload = (_) => {
        this.onAssetLoaded(element);
      };
      element.src = element.getAttribute("data-src");
    });
  }

  onAssetLoaded(image) {
    this.length += 1;

    const percent = this.length / this.elements.images.length;

    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`;

    if (percent === 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      });

      this.animateOut.to(this.elements.titleSpans, {
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
        y: "100%",
      });

      this.animateOut.to(
        this.elements.numberText,
        {
          stagger: 0.1,
          duration: 1.5,
          ease: "expo.out",
          y: "100%",
        },
        "-=1.4",
      );

      this.animateOut.to(
        this.element,
        {
          scaleY: 0,
          transformOrigin: "100% 100%",
          ease: "expo.out",
          duration: 1.5,
        },
        "-=1",
      );

      this.animateOut.call((_) => {
        this.emit("Completed");
      });
    });
  }

  destroy() {
    this.element.remove();
  }
}
