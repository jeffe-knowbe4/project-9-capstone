const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const cylinder = $(".cylinder");
const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
let currentRotation = 0;

function rotateCylinder(direction) {
  currentRotation += direction * 45;
  cylinder.style.transform = `rotateY(${currentRotation}deg)`;
}

prevBtn.addEventListener("click", () => rotateCylinder(1));
nextBtn.addEventListener("click", () => rotateCylinder(-1));

// click to show as current
$(".cylinder").addEventListener("click", (e) => {
  const el = e.target.closest(".face");
  if (el) {
    const copy = el.cloneNode(true);
    const current = $(".current-img");
    current.appendChild(copy);
    current.classList.add("show");
  }
});

// click current close button
$(".current-img .close").addEventListener("click", closeCurrent);
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") closeCurrent();
  if (e.key === "ArrowRight") rotateCylinder(-1);
  if (e.key === "ArrowLeft") rotateCylinder(1);
});

function closeCurrent() {
  const el = $(".current-img .face");
  if (el) {
    const current = $(".current-img");
    current.classList.remove("show");
    setTimeout(() => {
      current.removeChild(el);
    }, 350);
  }
}

class Nav {
  constructor() {
    this.links = [...$$("nav a")];

    this.links.forEach((a) => {
      a.addEventListener("click", (e) => {
        this.hide($("nav a.active"));
        this.show(a);
      });
    });
  }

  init() {
    const links = this.links;
    links[0].click();

    // maintains browser back button functionality
    window.addEventListener("popstate", function (e) {
      links.find((a) => a.href.includes(e.target.location.hash)).click();
    });
  }

  hide(a) {
    if (!a) return;

    a.classList.remove("active");
    const target = $(`#${a.href.split("#")[1]}`);
    target.classList.remove("show");
    setTimeout(() => {
      target.classList.remove("active");
    }, 300);
  }

  show(a) {
    a.classList.add("active");
    const target = $(`#${a.href.split("#")[1]}`);
    target.classList.add("show");
    setTimeout(() => {
      target.classList.add("active");
    }, 300);
  }
}

new Nav().init();
