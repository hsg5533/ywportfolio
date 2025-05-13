const navbarLinks = document.querySelectorAll(".navbar a");

navbarLinks.forEach((link) =>
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetEl = document.querySelector(link.getAttribute("href"));
    if (!targetEl) return;
    // 부드러운 스크롤
    targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
  })
);

// 스크롤 시 실행 함수 (내비게이션 스타일 업데이트)
window.addEventListener("scroll", () => {
  const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

  // 링크 활성화 토글
  navbarLinks.forEach((link) => {
    const targetEl = document.querySelector(link.getAttribute("href"));
    if (!targetEl) return;
    const elemTop = targetEl.offsetTop;
    const elemBottom = elemTop + targetEl.offsetHeight;
    if (elemTop <= scrollPos && scrollPos < elemBottom) {
      navbarLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 링크 색상 변경
  const sections = [
    document.getElementById("mainpage"),
    document.getElementById("sec1"),
    document.getElementById("sec2"),
    document.getElementById("sec3"),
    document.getElementById("sec4"),
  ];
  const positions = sections.map((sec) => sec.offsetTop);
  const [sec0Top, sec1Top, sec2Top, sec3Top, sec4Top] = positions;
  if (
    (scrollPos >= sec0Top && scrollPos < sec1Top) ||
    (scrollPos >= sec2Top && scrollPos < sec3Top) ||
    scrollPos >= sec4Top
  ) {
    navbarLinks.forEach((link) => (link.style.color = "#fffff0"));
  } else {
    navbarLinks.forEach((link) => (link.style.color = "#25252b"));
  }
});
