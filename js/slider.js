function initSlider({
  img,
  imgBox,
  btnLeft,
  btnRight,
  indicator,
  dots,
  active,
  button,
}) {
  const images = document.querySelectorAll(img);
  const count = images.length;
  if (!count) return;

  let current = 0;
  const timer = 1000;
  const leftBtn = document.querySelector(btnLeft);
  const rightBtn = document.querySelector(btnRight);
  const btns = document.querySelectorAll(button);
  images[0].style.left = "0";

  // 인디케이터 생성
  const indicators = [];
  const indicatorContainer = document.querySelector(indicator);
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.classList.add(dots);
    if (i === 0) dot.classList.add(active);
    indicatorContainer.appendChild(dot);
    indicators.push(dot);
  }

  // 슬라이드 함수
  const slide = (from, fromPos, to, toPos) => {
    images[from].animate([{ left: "0" }, { left: fromPos }], {
      duration: timer,
      fill: "forwards",
    });
    images[to].style.left = toPos;
    images[to].animate([{ left: toPos }, { left: "0" }], {
      duration: timer,
      fill: "forwards",
    });
    indicators[from].classList.remove(active);
    indicators[to].classList.add(active);
  };

  // 버튼 잠시 비활성화
  const disableButtons = () => {
    btns.forEach((btn) => (btn.style.pointerEvents = "none"));
    setTimeout(
      () => btns.forEach((btn) => (btn.style.pointerEvents = "auto")),
      timer
    );
  };

  // 내비게이션 핸들러
  rightBtn.addEventListener("click", function () {
    disableButtons();
    slide(current % count, "-100%", (current + 1) % count, "100%");
    current++;
  });
  leftBtn.addEventListener("click", function () {
    disableButtons();
    slide(current % count, "100%", (current - 1 + count) % count, "-100%");
    current--;
  });

  // 자동 재생
  let autoId;
  const box = document.querySelector(imgBox);
  function startAuto() {
    autoId = setInterval(() => rightBtn.click(), timer + 2000);
  }
  box.addEventListener("mouseenter", () => clearInterval(autoId));
  box.addEventListener("mouseleave", startAuto);
  startAuto();

  // 인디케이터 클릭
  indicators.forEach((dot, idx) => {
    dot.addEventListener("click", function () {
      const activeIdx = indicators.findIndex((el) =>
        el.classList.contains(active)
      );
      if (activeIdx < idx) {
        disableButtons();
        slide(activeIdx, "-100%", idx, "100%");
        current = idx;
      } else if (activeIdx > idx) {
        disableButtons();
        slide(activeIdx, "100%", idx, "-100%");
        current = idx;
      }
    });
  });
}

// Initialize both sliders
initSlider({
  img: ".sec3_img",
  imgBox: ".sec3_imgbox",
  btnLeft: ".btn_L",
  btnRight: ".btn_R",
  indicator: ".indis",
  dots: "indi",
  active: "indi_active",
  button: ".sec3_btn",
});
initSlider({
  img: ".sec3_img2",
  imgBox: ".sec3_imgbox2",
  btnLeft: ".btn_L2",
  btnRight: ".btn_R2",
  indicator: ".indis2",
  dots: "indi2",
  active: "indi2_active",
  button: ".sec3_btn2",
});
