import Component from "classes/Component";

export default class Animation extends Component {
  constructor({ element, elements, once = false }) {
    super({
      element,
      elements,
    });

    this.once = once;
    this.hasAnimated = false;

    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn();

          this.hasAnimated = true;

          if (this.once) {
            this.observer.unobserve(entry.target);
          }

          console.log("animateIn");
        } else {
          if (!this.once) {
            this.animateOut();
            console.log("animateOut");
          }
        }
      });
    });

    this.observer.observe(this.element);
  }

  animateIn() {}

  animateOut() {}

  onResize() {}
}
