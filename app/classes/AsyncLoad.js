import Component from "classes/Component";
import GSAP from "gsap";

export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({ element });
    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.element.src) {
            this.element.src = this.element.getAttribute("data-src");
            this.element.onload = (_) => {
              GSAP.from(this.element, {
                autoAlpha: 0,
                duration: 1.5,
                ease: "expo.out",
              });
            };
          }
        }
      });
    });

    this.observer.observe(this.element);
  }
}
