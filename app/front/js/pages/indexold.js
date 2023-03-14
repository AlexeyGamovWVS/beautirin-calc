import "../utils/utils";
import "../../scss/pages/index.scss";
import IMAGES_SOURCES from "../utils/images-data";
import PRICES from "../utils/prices-data";
import numberWithSpaces from "../components/index/numberspaces";
import {
  IMG,
  COLOR_RADIOS,
  SIZE_SELECT,
  AMOUNT_CAPTION,
  AMOUNT_CASSETS,
  AMOUNT_RADIOS,
  SUBMIT,
  PRICE,
  UPAKOVKA,
} from "../components/index/indexData";

// INITIAL STATE START

debugger;
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
  prevSize: "",
};

function changeImageByParams(colorId, sizeId) {
  let { color, size, imgSrc } = CALC_DATA;
  color = colorId;
  size = sizeId;
  // eslint-disable-next-line no-unused-vars
  imgSrc = IMAGES_SOURCES[`${color[0]}${size}`];
}
function canselDisabledAmount() {
  AMOUNT_RADIOS.forEach((radio) => {
    radio.removeAttribute("disabled");
    // eslint-disable-next-line no-param-reassign
    radio.parentNode.nextSibling.style.opacity = 1;
  });
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
  PRICE.textContent = `${numberWithSpaces(CALC_DATA.totalPrice)} ₽`;
}
function setInvalidRadio(arr) {
  arr.forEach((radio) => {
    radio.setAttribute("disabled", true);
    // eslint-disable-next-line no-param-reassign
    radio.parentNode.nextSibling.style.opacity = 0.3;
    if (radio.checked) {
      CALC_DATA.size = 0;
      CALC_DATA.price = 0;
      changeImageByParams(CALC_DATA.color[0], CALC_DATA.prevSize);
      updatePrice();
      // eslint-disable-next-line no-param-reassign
      radio.checked = false;
    }
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
      setInvalidRadio(newArr);
      break;
    case "2p5":
      filterArr = ["amount1", "amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      setInvalidRadio(newArr);
      break;
    case "4":
      filterArr = ["amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      setInvalidRadio(newArr);
      break;
    case "5":
      filterArr = ["amount1", "amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      setInvalidRadio(newArr);
      break;
    case "10":
      filterArr = ["amount1", "amount2", "amount5"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      setInvalidRadio(newArr);
      break;
    case "15":
      filterArr = ["amount1", "amount2", "amount5"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      setInvalidRadio(newArr);
      break;
    case "20":
      filterArr = ["amount1", "amount2", "amount3"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      setInvalidRadio(newArr);
      break;
    case "50":
      filterArr = ["amount3", "amount5"];
      newArr = AMOUNT_RADIOS.filter(
        (radio) => filterArr.indexOf(radio.id) >= 0
      );
      setInvalidRadio(newArr);
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

function setRealSize(value) {
  CALC_DATA.size = value === "2,5" ? "2p5" : `${value}`;
  CALC_DATA.prevSize = CALC_DATA.size;
}

function checkSizeSelect(value) {
  if (value) {
    setRealSize(value);
    CALC_DATA.price = PRICES[`${CALC_DATA.color[0]}${CALC_DATA.size}`];
    changeImageByParams(CALC_DATA.color[0], CALC_DATA.size);
  } else {
    CALC_DATA.size = 0;
    CALC_DATA.price = 0;
    changeImageByParams(CALC_DATA.color[0], CALC_DATA.prevSize);
  }
}

SIZE_SELECT.addEventListener("change", () => {
  setDisabledAmount();
  checkSizeSelect(SIZE_SELECT.value);
  updatePrice();
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
