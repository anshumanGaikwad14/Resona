import GSAP from "gsap";

class Colors {
  change({ background, color }) {
    GSAP.to(document.documentElement, {
      background: background,
      color: color,
      duration: 1.5,
    });
  }
}

export const ColorManager = new Colors();
