const convertForm = document.getElementById("converter-form");
const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const result = document.getElementById("amount-result");

window.addEventListener("load", fetchCurrencies);

convertForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies() {
  // https://api.exchangerate-api.com/v4/latest/USD
  const response = await fetch(
    "https://api.exchangerate-api.com/v4/latest/USD"
  );
  const data = await response.json();

  const currencyOptions = Object.keys(data.rates);
  currencyOptions.forEach((currency) => {
    // From Currency
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.textContent = currency;
    fromCurrency.appendChild(option1);

    // To Currency
    const option2 = document.createElement("option");
    option2.value = currency;
    option2.textContent = currency;
    toCurrency.appendChild(option2);
  });
}

async function convertCurrency(e) {
  e.preventDefault();

  const amountValue = parseFloat(amount.value);
  const fromCurrencyValue = fromCurrency.value;
  const toCurrencyValue = toCurrency.value;

  if (amountValue < 0) {
    alert("Please enter a valid amount");
    return;
  }

  const response = await fetch(
    `https://api.exchangerate-api.com/v4/latest/${fromCurrencyValue}`
  );
  const data = await response.json();
  console.log(data)

  const rate = data.rates[toCurrencyValue];
  const convertedAmount = (amountValue * rate).toFixed(2);

  result.textContent = `${amountValue} ${fromCurrencyValue} ≈ ${convertedAmount} ${toCurrencyValue}`;
}
