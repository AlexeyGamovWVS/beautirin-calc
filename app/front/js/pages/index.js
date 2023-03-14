/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import "../utils/utils";
import "../../scss/pages/index.scss";
import IMAGES_SOURCES from "../utils/images-data";
import PRICES from "../utils/prices-data";
import numberWithSpaces from "../components/index/numberspaces";
import BTR_FORM_FIELDS from "../components/index/indexData";

// INITIAL STATE START

const CALC_DATA = {
  color: "",
  size: 0,
  prevSize: 0,
  imgName: "",
  imgSrc: "",
  prevImgSrc: "",
  casset: 0,
  cassetAmount: 0,
  totalAmount: 0,
  price: 0,
  packPrice: 0,
  totalPackPrice: 0,
  packing: "Без упаковки",
  totalPrice: 0,
};

function changeImageByParams({ imgSrc }, { IMG }) {
  IMG.src = imgSrc;
}
function setInitialState(data, form, images, prices) {
  data.color = form.COLOR_RADIOS.find((radio) => radio.checked).value;
  data.size = +form.SIZE_SELECT.value;
  data.prevSize = +form.SIZE_SELECT.value;
  data.imgName = data.color[0] + data.size;
  data.imgSrc = images[data.imgName];
  data.prevImgSrc = data.imgSrc;
  getAmpulaPrice(data, prices);
  changeImageByParams(data, form);
  checkInvalidRadio(data, form);
  setEventListeners(data, form, images, prices);
}

function setEventListeners(data, form, images, prices) {
  setColorListener(data, images, form);
  setSizeListener(data, images, form, prices);
  setCassetSizeListener(data, form);
  setAmountCassetListener(data, form);
  setAdditionalServListener(data, form);
  setSubmitListener(data, form);
}

function setColorListener(data, images, { COLOR_RADIOS, ...form }) {
  COLOR_RADIOS.forEach((radio) => {
    radio.addEventListener("change", () => {
      data.color = radio.value;
      data.imgName = data.color[0] + data.size;
      console.log(data.imgName);
      data.imgSrc = images[data.imgName];
      changeImageByParams(data, form);
    });
  });
}

function getAmpulaPrice(data, prices) {
  console.log(prices);
  console.log(data.imgName);
  data.price = prices[data.imgName];
}

function setSizeListener(data, images, form, prices) {
  form.SIZE_SELECT.addEventListener("change", () => {
    if (form.SIZE_SELECT.value) {
      const sizeName =
        form.SIZE_SELECT.value === "2.5" ? "2p5" : +form.SIZE_SELECT.value;
      data.size = sizeName;
      data.imgName = data.color[0] + sizeName;
      data.imgSrc = images[data.imgName];
      checkInvalidRadio(data, form);
      const cassetDrop = form.AMOUNT_RADIOS.find((radio) => radio.checked);
      if (!cassetDrop) {
        changeCassetSize(data, 0, form);
      }
      changeImageByParams(data, form);
      getAmpulaPrice(data, prices);
      updatePrice(data, form);
    }
  });
}

function setTotalAmount(data) {
  data.totalAmount = data.cassetAmount * data.casset;
}

function changeAmountCaption(
  { cassetAmount, casset, totalAmount },
  { AMOUNT_CAPTION }
) {
  AMOUNT_CAPTION.textContent = `${cassetAmount} кассет * ${casset} шт в кассете = ${totalAmount} ампул`;
}

function changeCassetSize(data, value, form) {
  data.casset = value;
  setTotalAmount(data);
  changeAmountCaption(data, form);
  updatePrice(data, form);
}

function setCassetSizeListener(data, { AMOUNT_RADIOS, ...form }) {
  AMOUNT_RADIOS.forEach((radio) => {
    radio.addEventListener("change", () => {
      changeCassetSize(data, +radio.value, form);
    });
  });
}

function setAmountCassetListener(data, { AMOUNT_CASSETS, ...form }) {
  AMOUNT_CASSETS.addEventListener("input", () => {
    data.cassetAmount = +AMOUNT_CASSETS.value;
    setTotalAmount(data);
    changeAmountCaption(data, form);
    updatePrice(data, form);
  });
}

function setAdditionalServListener(data, { UPAKOVKA, ...form }) {
  UPAKOVKA.addEventListener("change", () => {
    data.packing = UPAKOVKA.checked
      ? "Упаковать в товарный вид"
      : "Без упаковки";
    updatePrice(data, form);
  });
}

function printPrice({ totalPrice }, { PRICE }) {
  PRICE.textContent = `${numberWithSpaces(totalPrice)} ₽`;
}

function updatePrice(data, form) {
  const packPrice =
    data.packing !== "Без упаковки"
      ? data.casset * data.price * data.cassetAmount
      : 0;
  data.totalPrice = data.totalAmount * data.price + packPrice;
  printPrice(data, form);
}
function setSubmitListener(data, { SUBMIT }) {
  SUBMIT.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(data);
  });
}

function canselDisabledRadios(radios) {
  radios.forEach((radio) => {
    radio.removeAttribute("disabled");
    radio.parentNode.nextSibling.style.opacity = 1;
  });
}

function setInvalidRadio(filters, radios, data, form) {
  canselDisabledRadios(radios);
  const newArr = radios.filter((radio) => filters.indexOf(radio.id) >= 0);
  newArr.forEach((radio) => {
    radio.setAttribute("disabled", true);
    radio.parentNode.nextSibling.style.opacity = 0.3;
    if (radio.checked) {
      radio.checked = false;
    }
  });
}
function checkInvalidRadio({ size, ...data }, { AMOUNT_RADIOS, ...form }) {
  let filterArr = [];
  switch (`${size}`) {
    case "2":
      filterArr = ["amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    case "2p5":
      filterArr = ["amount1", "amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    case "4":
      filterArr = ["amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    case "5":
      filterArr = ["amount1", "amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    case "10":
      filterArr = ["amount1", "amount2", "amount5"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    case "15":
      filterArr = ["amount1", "amount2", "amount5"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    case "20":
      filterArr = ["amount1", "amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    case "50":
      filterArr = ["amount3", "amount5"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS, data);
      break;
    default:
      break;
  }
}

setInitialState(CALC_DATA, BTR_FORM_FIELDS, IMAGES_SOURCES, PRICES);
