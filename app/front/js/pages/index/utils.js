/* eslint-disable no-param-reassign */
import numberWithSpaces from "./numberspaces";

function canselDisabledRadios(radios) {
  radios.forEach((radio) => {
    radio.removeAttribute("disabled");
    radio.parentNode.nextSibling.style.opacity = 1;
  });
}

function setInvalidRadio(filters, radios) {
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
export function checkInvalidRadio({ size }, { AMOUNT_RADIOS }) {
  let filterArr = [];
  switch (`${size}`) {
    case "2":
      filterArr = ["amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    case "2p5":
      filterArr = ["amount1", "amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    case "4":
      filterArr = ["amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    case "5":
      filterArr = ["amount1", "amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    case "10":
      filterArr = ["amount1", "amount2", "amount5"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    case "15":
      filterArr = ["amount1", "amount2", "amount5"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    case "20":
      filterArr = ["amount1", "amount2", "amount3"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    case "50":
      filterArr = ["amount3", "amount5"];
      setInvalidRadio(filterArr, AMOUNT_RADIOS);
      break;
    default:
      break;
  }
}

export function setTotalAmount(data) {
  data.totalAmount = data.cassetAmount * data.casset;
}

export function changeAmountCaption(
  { cassetAmount, casset, totalAmount },
  { AMOUNT_CAPTION }
) {
  AMOUNT_CAPTION.textContent = `${cassetAmount} кассет * ${casset} шт в кассете = ${totalAmount} ампул`;
}

function printPrice({ totalPrice }, { PRICE }) {
  PRICE.textContent = `${numberWithSpaces(totalPrice)} ₽`;
}

export function updatePrice(data, form) {
  const packPrice =
    data.packing !== "Без упаковки"
      ? data.casset * data.price * data.cassetAmount
      : 0;
  data.totalPrice = data.totalAmount * data.price + packPrice;
  printPrice(data, form);
}

export function changeCassetSize(data, value, form) {
  data.casset = value;
  setTotalAmount(data);
  changeAmountCaption(data, form);
  updatePrice(data, form);
}

export function getAmpulaPrice(data, prices) {
  console.log(prices);
  console.log(data.imgName);
  data.price = prices[data.imgName];
}

export function changeImageByParams({ imgSrc }, { IMG }) {
  IMG.src = imgSrc;
}
