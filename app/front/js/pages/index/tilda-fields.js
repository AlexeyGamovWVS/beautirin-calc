/* eslint-disable no-undef */
const colorField = document.querySelector('input[type="hidden"][name="color"]');
const sizeField = document.querySelector('input[type="hidden"][name="size"]');
const cassetField = document.querySelector(
  'input[type="hidden"][name="casset"]'
);
const amountCassetField = document.querySelector(
  'input[type="hidden"][name="amount_casset"]'
);
const totalAmountField = document.querySelector(
  'input[type="hidden"][name="total_amount"]'
);
const packingField = document.querySelector(
  'input[type="hidden"][name="packing"]'
);
const totalPriceField = document.querySelector(
  'input[type="hidden"][name="total_price"]'
);

export {
  colorField,
  sizeField,
  cassetField,
  amountCassetField,
  totalAmountField,
  packingField,
  totalPriceField,
};
