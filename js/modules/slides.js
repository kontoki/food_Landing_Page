function slides() {
  // slide
  const slides = document.querySelectorAll(".offer__slide");
  const slider = document.querySelector(".offer__slider");
  const prev = document.querySelector(".offer__slider-prev");
  const next = document.querySelector(".offer__slider-next");
  const total = document.querySelector("#total");
  const current = document.querySelector("#current");
  const slideWrapper = document.querySelector(".offer__slider-wrapper");
  const slideField = document.querySelector(".offer__slider-inner");
  const width = window.getComputedStyle(slideWrapper).width;
  let slideIndex = 1;
  let offset = 0;

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slideField.style.width = 100 * slides.length + "%";
  slideField.style.display = "flex";
  slideField.style.transition = "0.5s all";

  slideWrapper.style.overflow = "hidden";

  slides.forEach((slide) => {
    slide.style.width = width;
  });

  slider.style.position = "relative";

  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("carousel-indicators");
  indicators.style.cssText = `
  position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
   `;
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.style.cssText = `
      box-sizing: content-box;
      flex: 0 1 auto;
      width: 30px;
      height: 6px;
      margin-right: 3px;
      margin-left: 3px;
      cursor: pointer;
      background-color: #fff;
      background-clip: padding-box;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      opacity: .5;
      transition: opacity .6s ease;
      `;
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  function replaceNaN(string) {
    return +string.replace(/\D/g, "");
  }

  next.addEventListener("click", () => {
    if (offset === replaceNaN(width) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += replaceNaN(width);
    }

    slideField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }

    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if (offset == 0) {
      offset = replaceNaN(width) * (slides.length - 1);
    } else {
      offset -= replaceNaN(width);
    }

    slideField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
    dots.forEach((dot) => (dot.style.opacity = ".5"));
    dots[slideIndex - 1].style.opacity = 1;
  });
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideTo = e.target.getAttribute("data-slide-to");

      slideIndex = slideTo;
      offset = sreplaceNaN(width) * (slideTo - 1);

      slideField.style.transform = `translateX(-${offset}px)`;

      if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
      } else {
        current.textContent = slideIndex;
      }

      dots.forEach((dot) => (dot.style.opacity = ".5"));
      dots[slideIndex - 1].style.opacity = 1;
    });
  });
}

export default slides;
