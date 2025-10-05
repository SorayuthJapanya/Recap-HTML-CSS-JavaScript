// DOM ELEMENTS
const passwordInput = document.getElementById("password");
const copyBtn = document.getElementById("copy-btn");
const lengthSlider = document.getElementById("length");
const lengthDisplay = document.getElementById("length-value");
const uppercaseCheckBox = document.getElementById("uppercase");
const lowercaseCheckBox = document.getElementById("lowercase");
const numbersCheckBox = document.getElementById("numbers");
const symbolsCheckBox = document.getElementById("symbols");
const generateBtn = document.getElementById("generate-btn");
const strengthBar = document.querySelector(".strength-bar");
const strengthLabel = document.getElementById("strength-label");

// Character sets
const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
const numberCharacters = "0123456789";
const symbolCharacters = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

lengthSlider.addEventListener("input", () => {
  lengthDisplay.textContent = lengthSlider.value;
});

generateBtn.addEventListener("click", makePassword);

copyBtn.addEventListener("click", copyToClipBoard);

function makePassword() {
  const length = Number(lengthSlider.value);
  const uppercase = uppercaseCheckBox.checked;
  const lowercase = lowercaseCheckBox.checked;
  const numbers = numbersCheckBox.checked;
  const symbols = symbolsCheckBox.checked;

  if (!uppercase && !lowercase && !numbers && !symbols) {
    alert("Please select at least one char type.");
    return;
  }

  const newPassword = createRandomPassword(
    length,
    uppercase,
    lowercase,
    numbers,
    symbols
  );

  passwordInput.value = newPassword;
  updateStrengthMeter(newPassword);
}

function createRandomPassword(length, uppercase, lowercase, numbers, symbols) {
  let allCharacters = "";

  if (uppercase) allCharacters += uppercaseLetters;
  if (lowercase) allCharacters += lowercaseLetters;
  if (numbers) allCharacters += numberCharacters;
  if (symbols) allCharacters += symbolCharacters;

  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allCharacters.length);
    password += allCharacters[randomIndex];
  }

  return password;
}

function updateStrengthMeter(password) {
  const passwordLength = password.length;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()-_=+[\]{}|;:,.<>?]/.test(password);

  let strengthScore = 0;
  strengthScore += Math.min(passwordLength * 2, 40);

  if (hasUppercase) strengthScore += 15;
  if (hasLowercase) strengthScore += 15;
  if (hasNumbers) strengthScore += 15;
  if (hasSymbols) strengthScore += 15;

  if (passwordLength < 8) {
    strengthScore = Math.min(strengthScore, 40);
  }

  const safeScore = Math.max(5, Math.min(100, strengthScore));
  strengthBar.style.width = safeScore + "%";

  let strengthLabelText = "";
  let allstrengthLabelTextColor = ["text-weak", "text-medium", "text-strong"];
  let textColor = "";
  let allBarColor = ["bg-weak", "bg-medium", "bg-strong"];
  let barColor = "";

  if (strengthScore < 40) {
    barColor = "bg-weak";
    textColor = "text-weak";
    strengthLabelText = "Weak";
  } else if (strengthScore < 70) {
    barColor = "bg-medium";
    textColor = "text-medium";
    strengthLabelText = "Medium";
  } else {
    barColor = "bg-strong";
    textColor = "text-strong";
    strengthLabelText = "Strong";
  }

  // Reset Color
  allBarColor.forEach((color) => {
    strengthBar.classList.remove(color);
  });
  allstrengthLabelTextColor.forEach((color) => {
    strengthLabel.classList.remove(color);
  });

  if (strengthBar && strengthLabelText && textColor) {
    strengthBar.classList.add(barColor);
    strengthLabel.classList.add(textColor);
    strengthLabel.textContent = strengthLabelText;
  }
}

function copyToClipBoard() {
  const passwordValue = passwordInput.value;

  if (passwordValue === "") return;

  navigator.clipboard.writeText(passwordValue);
  alert(`Copied password: ${passwordValue}`);
}
