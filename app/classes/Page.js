import GSAP from "gsap";
import { each, transform } from "lodash";
import Prefix from "prefix";

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = {
      ...elements,
    };
    this.id = id;

    this.onMouseWheel = this.onMouseWheel.bind(this);

    this.transformPrefix = Prefix("transform");
  }

  create() {
    this.element = document.querySelector(this.selector);

    this.elements = {};

    this.scroll = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    };

    each(this.selectorChildren, (entry, key) => {
      if (
        entry instanceof window.HTMLElement ||
        entry instanceof window.NodeList ||
        Array.isArray(entry)
      ) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });
  }

  show() {
    return new Promise((resolve) => {
      this.animateIn = GSAP.timeline();
      this.animateIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        },
      );

      this.animateIn.call((_) => {
        this.addEventListeners();
        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      this.removeEventListeners();

      this.animateOut = GSAP.timeline();
      this.animateOut.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }

  onResize() {
    if (this.elements.wrapper) {
      this.scroll.limit =
        this.elements.wrapper.clientHeight - window.innerHeight;
    }
  }

  update() {
    this.scroll.target = GSAP.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target,
    );

    this.scroll.current = GSAP.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.05,
    );

    if (this.scroll.current < 0.01) {
      this.scroll.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] =
        `translateY(-${this.scroll.current}px)`;
    }
  }

  onMouseWheel(event) {
    const { deltaY } = event;
    this.scroll.target += deltaY;
  }

  addEventListeners() {
    window.addEventListener("wheel", this.onMouseWheel);
  }

  removeEventListeners() {
    console.log("removed");
    window.removeEventListener("wheel", this.onMouseWheel);
  }
}
