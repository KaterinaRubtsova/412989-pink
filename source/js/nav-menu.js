var navButton = document.querySelector(".main-nav__button");
var navMenu = document.querySelector(".site-list");
var navColor = document.querySelector(".main-nav");
var pageHeaderMain = document.querySelector(".page-header--main");
var pageHeaderRegular = document.querySelector(".page-header--regular");

navButton.addEventListener("click", function() {
  if (navButton.classList.contains("main-nav__button--burger")) {
    navButton.classList.remove("main-nav__button--burger");
    navButton.classList.add("main-nav__button--cross");
    navMenu.classList.remove("site-list--closed");
    navMenu.classList.add("site-list--opened");
    navColor.classList.remove("main-nav--transparent");
    navColor.classList.add("main-nav--filled");
    pageHeaderMain.classList.add("page-header--opened-main");
    pageHeaderRegular.classList.add("page-header--opened-regular");
  }
  else {
    navButton.classList.remove("main-nav__button--cross");
    navButton.classList.add("main-nav__button--burger");
    navMenu.classList.remove("site-list--opened");
    navMenu.classList.add("site-list--closed");
    navColor.classList.remove("main-nav--filled");
    navColor.classList.add("main-nav--transparent");
    pageHeaderMain.classList.remove("page-header--opened-main");
    pageHeaderRegular.classList.remove("page-header--opened-regular");
  }
});
