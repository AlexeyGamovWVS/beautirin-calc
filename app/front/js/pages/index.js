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
function setInitialState(data, form, images) {
  data.color = form.COLOR_RADIOS.find((radio) => radio.checked).value;
  data.size = +form.SIZE_SELECT.value;
  data.prevSize = +form.SIZE_SELECT.value;
  data.imgName = data.color[0] + data.size;
  data.imgSrc = images[data.imgName];
  data.prevImgSrc = data.imgSrc;

  changeImageByParams(data, form);
  setEventListeners(data, form, images);
}

function setEventListeners(data, form, images) {
  setColorListener(data, images, form);
  setSizeListener(data, images, form);
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
      data.imgSrc = images[data.imgName];
      changeImageByParams(data, form);
    });
  });
}

function setSizeListener(data, images, { SIZE_SELECT, ...form }) {
  SIZE_SELECT.addEventListener("change", () => {
    if (SIZE_SELECT.value) {
      const sizeNname = +SIZE_SELECT.value === 2.5 ? "2p5" : SIZE_SELECT.value;
      data.size = +SIZE_SELECT.value;
      data.imgName = data.color[0] + sizeNname;
      data.imgSrc = images[data.imgName];
      changeImageByParams(data, form);
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

function setCassetSizeListener(data, { AMOUNT_RADIOS, ...form }) {
  AMOUNT_RADIOS.forEach((radio) => {
    radio.addEventListener("change", () => {
      data.casset = +radio.value;
      setTotalAmount(data);
      changeAmountCaption(data, form);
    });
  });
}

function setAmountCassetListener(data, { AMOUNT_CASSETS, ...form }) {
  AMOUNT_CASSETS.addEventListener("input", () => {
    data.cassetAmount = +AMOUNT_CASSETS.value;
    setTotalAmount(data);
    changeAmountCaption(data, form);
  });
}

function setAdditionalServListener(data, { UPAKOVKA }) {
  UPAKOVKA.addEventListener("change", () => {
    data.packing = UPAKOVKA.checked
      ? "Упаковать в товарный вид"
      : "Без упаковки";
  });
}

function setSubmitListener(data, { SUBMIT }) {
  SUBMIT.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(data);
  });
}

setInitialState(CALC_DATA, BTR_FORM_FIELDS, IMAGES_SOURCES);
