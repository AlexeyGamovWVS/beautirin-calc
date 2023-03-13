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
const SIZE_SELECT = CALC.querySelector("#size");
const AMOUNT_RADIOS = Array.from(
  CALC.querySelectorAll('input[data-t="field:input-amount"]')
);
const SUBMIT = CALC.querySelector(".btr-form__submit");

// PAGE ELEMENTS END

// INITIAL STATE START
const initialColor = COLOR_RADIOS.find((radio) => radio.checked).value;
const initialSize = SIZE_SELECT.value;

const CALC_DATA = {
  color: initialColor,
  size: initialSize,
  imgName: initialColor[0] + initialSize,
  imgSrc: IMAGES_SOURCES[`${initialColor[0]}${initialSize}`],
  casset: 0,
};

IMG.src = CALC_DATA.imgSrc;

function changeImageByParams(colorId, sizeId) {
  let { color, size, imgSrc, imgName } = CALC_DATA;
  color = colorId;
  size = sizeId;
  imgSrc = IMAGES_SOURCES[`${color[0]}${size}`];
  // eslint-disable-next-line no-unused-vars
  imgName = `${color[0]}${size}`;
  IMG.src = imgSrc;
}
function canselDisabledAmount() {
  AMOUNT_RADIOS.forEach((radio) => {
    radio.removeAttribute("disabled");
    // eslint-disable-next-line no-param-reassign
    radio.parentNode.nextSibling.style.opacity = 1;
  });
}
function setDisabledAmount() {
  canselDisabledAmount();
  let filterArr = [];
  let newArr = [];
  const { size } = CALC_DATA;
  switch (size) {
    case "2":
      filterArr = ["amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "2,5":
      filterArr = ["amount1", "amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "4":
      filterArr = ["amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "5":
      filterArr = ["amount1", "amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "10":
      filterArr = ["amount1", "amount2", "amount5"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "15":
      filterArr = ["amount1", "amount2", "amount5"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "20":
      filterArr = ["amount1", "amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "50":
      filterArr = ["amount3", "amount5"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    default:
      break;
  }
}
changeImageByParams(CALC_DATA.color[0], CALC_DATA.size);
setDisabledAmount();
// INITIAL STATE END

// ADD LISTENERS

SIZE_SELECT.addEventListener("change", () => {
  CALC_DATA.size = SIZE_SELECT.value;
  setDisabledAmount();
  changeImageByParams(CALC_DATA.color, CALC_DATA.size);
});

COLOR_RADIOS.forEach((radio) => {
  radio.addEventListener("change", () => {
    CALC_DATA.color = radio.value;
    changeImageByParams(CALC_DATA.color, CALC_DATA.size);
  });
});

AMOUNT_RADIOS.forEach((radio) => {
  radio.addEventListener("change", () => {
    CALC_DATA.casset = radio.value;
  });
});

SUBMIT.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(CALC_DATA.color);
  console.log(CALC_DATA.size);
  console.log(CALC_DATA.imgSrc);
  console.log(CALC_DATA.imgName);
  console.log(CALC_DATA.casset);
});
