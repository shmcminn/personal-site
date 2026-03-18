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

  // Sticky bar — show when header scrolls out of view
  var siteHeader = document.querySelector(".site-header");
  var stickyBar = document.getElementById("sticky-bar");
  if (siteHeader && stickyBar && "IntersectionObserver" in window) {
    var headerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          stickyBar.classList.toggle("is-visible", !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    headerObserver.observe(siteHeader);
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
