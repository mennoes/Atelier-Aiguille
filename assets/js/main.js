(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const list = document.querySelector(".nav__list");

  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 4);
    document.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (toggle && list) {
    toggle.addEventListener("click", () => {
      const open = list.getAttribute("data-open") === "true";
      list.setAttribute("data-open", String(!open));
      toggle.setAttribute("aria-expanded", String(!open));
    });
  }

  // Reveal on scroll
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  // Lightbox
  const items = document.querySelectorAll(".gallery__item");
  const lightbox = document.querySelector(".lightbox");
  const lbImg = lightbox?.querySelector(".lightbox__img");
  const lbClose = lightbox?.querySelector(".lightbox__close");

  const openLightbox = (src, alt) => {
    if (!lightbox || !lbImg) return;
    lbImg.src = src;
    lbImg.alt = alt || "";
    lightbox.setAttribute("data-open", "true");
    document.body.style.overflow = "hidden";
  };
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.removeAttribute("data-open");
    document.body.style.overflow = "";
    if (lbImg) lbImg.src = "";
  };

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img && img.src) openLightbox(img.currentSrc || img.src, img.alt);
    });
    item.setAttribute("tabindex", "0");
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });
  lbClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Mark current nav link based on path
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav__link").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href) return;
    const target = href.split("/").pop();
    if (target === path) a.setAttribute("aria-current", "page");
  });
})();
