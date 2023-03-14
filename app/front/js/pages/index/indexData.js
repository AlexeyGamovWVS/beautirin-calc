// PAGE ELEMETS START
// eslint-disable-next-line no-undef
const CALC = document.querySelector(".btr-form");
// eslint-disable-next-line no-undef
const IMG = document.querySelector(".btr-imagebox__image");

const COLOR_RADIOS = Array.from(
  CALC.querySelectorAll('input[data-t="field:input-color"]')
);
const SIZE_SELECT = CALC.querySelector("#size");
const AMOUNT_RADIOS = Array.from(
  CALC.querySelectorAll('input[data-t="field:input-amount"]')
);
const AMOUNT_CASSETS = CALC.querySelector(
  'input[data-t="field:input-cassetsamount"]'
);
const AMOUNT_CAPTION = CALC.querySelector("#cassetsamount_caption");
const SUBMIT = CALC.querySelector(".btr-form__submit");
const PRICE = CALC.querySelector(".btr-form__price");
const UPAKOVKA = CALC.querySelector("input[data-t='field:input-proizvodstvo']");

// PAGE ELEMENTS END

const BTR_FORM_FIELDS = {
  CALC,
  IMG,
  COLOR_RADIOS,
  SIZE_SELECT,
  AMOUNT_CAPTION,
  AMOUNT_CASSETS,
  AMOUNT_RADIOS,
  SUBMIT,
  PRICE,
  UPAKOVKA,
};

export default BTR_FORM_FIELDS;
