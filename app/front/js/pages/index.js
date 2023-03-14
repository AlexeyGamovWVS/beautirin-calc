import "../utils/utils";
import "../../scss/pages/index.scss";
import IMAGES_SOURCES from "../utils/images-data";
import PRICES from "../utils/prices-data";
import numberWithSpaces from "../components/index/numberspaces";
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

// INITIAL STATE START
const initialColor = COLOR_RADIOS.find((radio) => radio.checked).value;
const initialSize = SIZE_SELECT.value;

const CALC_DATA = {
  color: initialColor,
  size: initialSize,
  imgName: initialColor[0] + initialSize,
  imgSrc: IMAGES_SOURCES[`${initialColor[0]}${initialSize}`],
  casset: 0,
  casset_amount: 0,
  totalAmount: 0,
  price: 4,
  packPrice: 0,
  totalPackPrice: 0,
  packing: "Без упаковки",
  totalPrice: 0,
};

IMG.src = CALC_DATA.imgSrc;

function changeImageByParams(colorId, sizeId) {
  let { color, size, imgSrc } = CALC_DATA;
  color = colorId;
  size = sizeId;
  imgSrc = IMAGES_SOURCES[`${color[0]}${size}`];
  // eslint-disable-next-line no-unused-vars
  IMG.src = imgSrc;
}
function canselDisabledAmount() {
  AMOUNT_RADIOS.forEach((radio) => {
    radio.removeAttribute("disabled");
    // eslint-disable-next-line no-param-reassign
    radio.parentNode.nextSibling.style.opacity = 1;
  });
}
function printPrice() {
  PRICE.textContent = `${numberWithSpaces(CALC_DATA.totalPrice)} ₽`;
}
function updatePackPrice() {
  CALC_DATA.packPrice = +CALC_DATA.casset * CALC_DATA.price;
  CALC_DATA.totalPackPrice = CALC_DATA.packPrice * CALC_DATA.casset_amount;
}
function updatePrice() {
  updatePackPrice();
  const upac =
    CALC_DATA.packing === "Без упаковки" ? 0 : CALC_DATA.totalPackPrice;
  CALC_DATA.totalPrice = CALC_DATA.totalAmount * CALC_DATA.price + upac;
  printPrice();
}
function checkInvalidRadio(radio) {
  if (radio.checked) {
    CALC_DATA.price = 0;
    updatePrice();
    // eslint-disable-next-line no-param-reassign
    radio.checked = false;
  }
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
        checkInvalidRadio(radio);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    case "2p5":
      filterArr = ["amount1", "amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      newArr.forEach((radio) => {
        radio.setAttribute("disabled", true);
        checkInvalidRadio(radio);
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
        checkInvalidRadio(radio);
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
        checkInvalidRadio(radio);
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
        checkInvalidRadio(radio);
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
        checkInvalidRadio(radio);
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
        checkInvalidRadio(radio);
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
        checkInvalidRadio(radio);
        // eslint-disable-next-line no-param-reassign
        radio.parentNode.nextSibling.style.opacity = 0.3;
      });
      break;
    default:
      break;
  }
}
function changeAmountCaption() {
  CALC_DATA.totalAmount = +CALC_DATA.casset_amount * +CALC_DATA.casset;
  AMOUNT_CAPTION.textContent = `${CALC_DATA.casset_amount} кассет * ${CALC_DATA.casset} шт в кассете = ${CALC_DATA.totalAmount} ампул`;
}

changeImageByParams(CALC_DATA.color[0], CALC_DATA.size);
setDisabledAmount();
changeAmountCaption();
updatePrice();
// INITIAL STATE END

// ADD LISTENERS

SIZE_SELECT.addEventListener("change", () => {
  CALC_DATA.size = SIZE_SELECT.value === "2,5" ? "2p5" : SIZE_SELECT.value;
  setDisabledAmount();
  changeImageByParams(CALC_DATA.color, CALC_DATA.size);
  CALC_DATA.price = PRICES[`${CALC_DATA.color[0]}${CALC_DATA.size}`];
  updatePrice();
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
    changeAmountCaption();
    updatePrice();
  });
});

AMOUNT_CASSETS.addEventListener("input", () => {
  CALC_DATA.casset_amount = AMOUNT_CASSETS.value;
  changeAmountCaption();
  updatePrice();
});

UPAKOVKA.addEventListener("change", () => {
  CALC_DATA.packing = UPAKOVKA.checked
    ? "Упаковать в товарный вид"
    : "Без упаковки";
  updatePrice();
});

SUBMIT.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(CALC_DATA);
});
