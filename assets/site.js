"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.documentElement;

  var heroPhoto = document.querySelector(".hero-photo[data-headshot]");
  var banditPhoto = document.querySelector(".bandit-figure img");
  var defaultHeroSrc = "";
  var ninersHeroSrc = "";
  var defaultBanditSrc = "";
  var ninersBanditSrc = "";

  function setImageSource(imageEl, src) {
    if (!imageEl || !src) {
      return;
    }

    var testImg = new Image();
    testImg.onload = function () {
      imageEl.src = src;
    };
    testImg.src = src;
  }

  function syncThemePhotos() {
    if (rootEl.classList.contains("theme-49ers")) {
      setImageSource(heroPhoto, ninersHeroSrc);
      setImageSource(banditPhoto, ninersBanditSrc);
    } else {
      setImageSource(heroPhoto, defaultHeroSrc);
      setImageSource(banditPhoto, defaultBanditSrc);
    }
  }

  if (heroPhoto) {
    defaultHeroSrc = heroPhoto.getAttribute("data-headshot") || heroPhoto.getAttribute("src") || "";
    ninersHeroSrc = heroPhoto.getAttribute("data-headshot-49ers") || "";
  }

  if (banditPhoto) {
    defaultBanditSrc = banditPhoto.getAttribute("src") || "";
    ninersBanditSrc = banditPhoto.getAttribute("data-bandit-49ers") || "";
  }

  syncThemePhotos();

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a"));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      if (!id || id.charAt(0) !== "#") {
        return null;
      }
      return document.querySelector(id);
    })
    .filter(Boolean);

  function setCurrent(hash) {
    navLinks.forEach(function (link) {
      if (link.getAttribute("href") === hash) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setCurrent(link.getAttribute("href"));
    });
  });

  if ("IntersectionObserver" in window && sections.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setCurrent("#" + entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -45% 0px",
        threshold: 0.01
      }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  } else if (navLinks.length > 0) {
    setCurrent(navLinks[0].getAttribute("href"));
  }

  var ninersToggle = document.getElementById("niners-toggle");
  if (ninersToggle) {
    ninersToggle.setAttribute("aria-pressed", String(rootEl.classList.contains("theme-49ers")));
    ninersToggle.addEventListener("click", function () {
      var isEnabled = rootEl.classList.toggle("theme-49ers");
      ninersToggle.setAttribute("aria-pressed", String(isEnabled));
      syncThemePhotos();
    });
  }
});
