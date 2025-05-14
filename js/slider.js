function initSlider({ img, btn, btnLeft, btnRight, indicator, dots, active }) {
  let current = 0;
  const timer = 1000;
  const indis = [];
  const imgs = document.querySelectorAll(img);
  const btns = document.querySelectorAll(btn);
  const leftBtn = document.querySelector(btnLeft);
  const rightBtn = document.querySelector(btnRight);
  const container = document.querySelector(indicator);
  const count = imgs.length;
  imgs[0].style.left = "0";

  // 인디케이터 생성
  for (let i = 0; i < count; i++) {
    const dot = document.createElement("div");
    dot.classList.add(dots);
    if (i === 0) dot.classList.add(active);
    container.appendChild(dot);
    indis.push(dot);
  }

  // 슬라이드 함수
  const slide = (from, fromPos, to, toPos) => {
    imgs[from].animate([{ left: "0" }, { left: fromPos }], {
      duration: timer,
      fill: "forwards",
    });
    imgs[to].style.left = toPos;
    imgs[to].animate([{ left: toPos }, { left: "0" }], {
      duration: timer,
      fill: "forwards",
    });
    indis[from].classList.remove(active);
    indis[to].classList.add(active);
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
  setInterval(() => rightBtn.click(), timer + 2000);

  // 인디케이터 클릭
  indis.forEach((dot, idx) => {
    dot.addEventListener("click", function () {
      const activeIdx = indis.findIndex((el) => el.classList.contains(active));
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
  btn: ".sec3_btn",
  btnLeft: ".btn_L",
  btnRight: ".btn_R",
  indicator: ".indis",
  dots: "indi",
  active: "indi_active",
});
initSlider({
  img: ".sec3_img2",
  btn: ".sec3_btn2",
  btnLeft: ".btn_L2",
  btnRight: ".btn_R2",
  indicator: ".indis2",
  dots: "indi2",
  active: "indi2_active",
});
