import "../utils/utils";
import "../../scss/pages/index.scss";
import blackTest from "../../../images/black-test.png";
import transTest from "../../../images/trans-test.png";
import whiteTest from "../../../images/white-test.png";

// eslint-disable-next-line no-undef
const CALC = document.querySelector(".btr-form");
// eslint-disable-next-line no-undef
const IMG = document.querySelector(".btr-imagebox__image");

const COLOR_RADIOS = Array.from(
  CALC.querySelectorAll('input[data-t="field:input-color"]')
);
const SUBMIT = CALC.querySelector(".btr-form__submit");

const initialColor = COLOR_RADIOS.find((radio) => radio.checked).value;
const CALC_DATA = {
  color: initialColor,
};

function changeImageByColor(value) {
  switch (value) {
    case "white":
      IMG.src = whiteTest;
      break;
    case "black":
      IMG.src = blackTest;
      break;
    case "transparent":
      IMG.src = transTest;
      break;
    default:
      break;
  }
}

changeImageByColor(CALC_DATA.color);

COLOR_RADIOS.forEach((radio) => {
  radio.addEventListener("change", () => {
    CALC_DATA.color = radio.value;
    changeImageByColor(CALC_DATA.color);
  });
});

SUBMIT.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(CALC_DATA.color);
});
