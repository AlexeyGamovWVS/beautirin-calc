import "../utils/utils";
import "../../scss/pages/index.scss";
import IMAGES_SOURCES from "../utils/images-data";

// PAGE ELEMETS START
// eslint-disable-next-line no-undef
const CALC = document.querySelector(".btr-form");
// eslint-disable-next-line no-undef
const IMG = document.querySelector(".btr-imagebox__image");

const COLOR_RADIOS = Array.from(
  CALC.querySelectorAll('input[data-t="field:input-color"]')
);
const SIZE_SELECT = CALC.querySelector(".btr-select");
const SUBMIT = CALC.querySelector(".btr-form__submit");

// PAGE ELEMENTS END

// INITIAL STATE START
const initialColor = COLOR_RADIOS.find((radio) => radio.checked).value;
const initialSize = SIZE_SELECT.value;

const CALC_DATA = {
  color: initialColor,
  size: +initialSize,
  imgSrc: IMAGES_SOURCES[`${initialColor[0]}${initialSize}`],
};

IMG.src = CALC_DATA.imgSrc;

function changeImageByParams(colorId, sizeId) {
  let { color, size, imgSrc } = CALC_DATA;
  color = colorId;
  size = sizeId;
  imgSrc = IMAGES_SOURCES[`${color[0]}${size}`];
  IMG.src = imgSrc;
  console.log(imgSrc);
}

// changeImageByParams(CALC_DATA.color[0], CALC_DATA.size);
// INITIAL STATE END

// ADD LISTENERS

SIZE_SELECT.addEventListener("change", () => {
  CALC_DATA.size = SIZE_SELECT.value;
  changeImageByParams(CALC_DATA.color, CALC_DATA.size);
});

COLOR_RADIOS.forEach((radio) => {
  radio.addEventListener("change", () => {
    CALC_DATA.color = radio.value;
    changeImageByParams(CALC_DATA.color, CALC_DATA.size);
  });
});

SUBMIT.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(CALC_DATA.color);
  console.log(CALC_DATA.size);
  console.log(CALC_DATA.imgSrc);
});
