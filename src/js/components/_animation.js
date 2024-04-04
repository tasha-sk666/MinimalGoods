/* eslint-disable prefer-const */
/* eslint-disable import/no-extraneous-dependencies */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const randomNumber = () => {
  const max = 100;
  const min = 50;
  const number = (Math.floor(Math.random() * (max - min)) + min) * -1;

  return `${number}%`;
};

/* GSAP ITEMS */
const changeTheme = () => {
  const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
  scrollColorElems.forEach((colorSection, i) => {
    const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;

    ScrollTrigger.create({
      trigger: colorSection,
      start: "top bottom",
      end: "bottom top",
      onEnter: () =>
        gsap.to("body, .header", {
          backgroundColor: colorSection.dataset.bgcolor,
        }),
      onLeaveBack: () =>
        gsap.to("body, .header", {
          backgroundColor: prevBg,
        }),
    });
  });
};

const logoAnimation = () => {
  const triggerElement = document.querySelector(`.js-banner`);
  const targetElement = document.querySelector(`.js-header-logo`);
  let tl;

  if (triggerElement) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center-=40%",
        end: "bottom top",
        scrub: 1,
        // markers: true,
      },
    });

    tl.fromTo(
      targetElement,
      {
        width: "100%",
        y: "-115%",
      },
      {
        width: "14em",
        y: "0",
      },
    );
  }
};

const heroTextAnimation = () => {
  const texts = document.querySelectorAll(`.hero__text-move`);

  texts.forEach((text) => {
    if (text) {
      const triggerElement = text;
      const targetElement = text;
      let tl;

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "center center",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      tl.fromTo(
        targetElement,
        {
          y: "0",
        },
        {
          y: "120%",
        },
      );
    }
  });
};

const stickyCircle = () => {
  const triggerElement = document.querySelector(`.sticky-circle__wrap`);
  const targetElement = triggerElement.querySelector(`.sticky-circle__element`);
  let tl;

  if (triggerElement) {
    tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    tl.fromTo(
      targetElement,
      {
        width: "35em",
        height: "35em",
        borderRadius: "35em",
      },
      {
        width: "100vw",
        height: "80vh",
        borderRadius: "0",
      },
    );
  }
};

const galleryText = () => {
  const titles = document.querySelectorAll(".gallery__text-item");

  const setActiveText = (currentIndex) => {
    titles.forEach((title) => {
      title.classList.remove("active");
    });

    titles[currentIndex].classList.add("active");
  };

  const imagesWrappers = document.querySelectorAll(".gallery__images-wrap");

  imagesWrappers.forEach((wrapper, index) => {
    const triggerElement = wrapper;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => {
          setActiveText(index);
        },
        onEnterBack: () => {
          setActiveText(index);
        },
      },
    });
  });
};

const galleryImages = () => {
  const images = document.querySelectorAll(".gallery__images-item");

  if (images) {
    images.forEach((image) => {
      const triggerElement = image;
      const targetElement = image;
      let tl;
      const random = randomNumber();

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.to(targetElement, {
        y: random,
      });
    });
  }
};

window.addEventListener("DOMContentLoaded", () => {
  changeTheme();
  logoAnimation();
  heroTextAnimation();
  stickyCircle();
  galleryText();
  galleryImages();
});

document.addEventListener("resize", () => {
  ScrollTrigger.refresh();
});
