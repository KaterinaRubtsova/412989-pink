(function () {
  var popupFail = document.querySelector(".popup--fail");
  var popupSuccess = document.querySelector(".popup--success");
  var closeFail = document.querySelector(".popup__button--fail");
  var closeSuccess = document.querySelector(".popup__button--success");
  var submitButton = document.querySelector(".form__submit-button");
  var nameInput = document.querySelector(".name-required");
  var surnameInput = document.querySelector(".surname-required");
  var emailInput = document.querySelector(".email-required");


  function onSubmitButtonClick(event) {
    event.preventDefault();
    if (!nameInput.value || !surnameInput.value || !emailInput.value) {
      popupFail.classList.add("popup-open");
    }
    else {
      popupSuccess.classList.add("popup-open");
    }
  }

  submitButton.addEventListener("click", onSubmitButtonClick);
  closeFail.addEventListener("click", function () {
    popupFail.classList.remove("popup-open");
  });
  closeSuccess.addEventListener("click", function () {
    popupSuccess.classList.remove("popup-open");
  })
})();
