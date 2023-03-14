/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import "../utils/utils";
import "../../scss/pages/index.scss";
import IMAGES_SOURCES from "./index/images-data";
import PRICES from "./index/prices-data";
import BTR_FORM_FIELDS from "./index/indexData";
import {
  updatePrice,
  checkInvalidRadio,
  changeCassetSize,
  getAmpulaPrice,
  setTotalAmount,
  changeAmountCaption,
  changeImageByParams,
} from "./index/utils";
import CALC_DATA from "./index/calc-data";
import {
  amountCassetField,
  cassetField,
  colorField,
  packingField,
  sizeField,
  totalAmountField,
  totalPriceField,
} from "./index/tilda-fields";

// INITIAL STATE START

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
  // eslint-disable-next-line no-undef
  console.log(document.querySelector(".t702 .t-input-group"));
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

function setSubmitListener(data, { SUBMIT }) {
  SUBMIT.addEventListener("click", (e) => {
    colorField.value = data.color;
    sizeField.value = data.size;
    cassetField.value = data.casset;
    amountCassetField.value = data.cassetAmount;
    totalAmountField.value = data.totalAmount;
    packingField.value = data.packing;
    totalPriceField.value = data.totalPrice;
  });
}

setInitialState(CALC_DATA, BTR_FORM_FIELDS, IMAGES_SOURCES, PRICES);
