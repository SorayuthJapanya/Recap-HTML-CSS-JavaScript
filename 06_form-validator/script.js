// DOMS ELEMENT
const registerForm = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

registerForm.addEventListener("submit", handleSubmitForm);

function handleSubmitForm(e) {
  e.preventDefault();

  const formData = new FormData(registerForm);
  formData.append("username", username.value.trim());
  formData.append("email", email.value.trim());
  formData.append("password", password.value.trim());
  formData.append("confirmPassword", confirmPassword.value.trim());

  const isRequiredValid = checkRequired(formData);

  let isFormValid = false;

  if (isRequiredValid) {
    const isUsernameValid = checkLength(formData, "username", 3, 15);
    const isEmailValid = checkEmail(formData.get("email"));
    const isPasswordValid = checkLength(formData, "password", 6, 15);
    const isPasswordsMatch = checkPasswordsMatch(
      formData.get("password"),
      formData.get("confirmPassword")
    );

    console.log({
      isUsernameValid,
      isEmailValid,
      isPasswordValid,
      isPasswordsMatch,
    });
    isFormValid =
      isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }
  console.log(isFormValid);

  if (isFormValid) {
    alert("Register successfully!!");
    registerForm.reset();

    document.querySelectorAll("input").forEach((input) => {
      input.classList.remove("border-emerald-500", "border-red-500");
      input.classList.add("border-gray-300");
    });

    document.querySelectorAll("small").forEach((small) => {
      small.classList.add("hidden");
      small.classList.remove("block");
    });
  }
}

function checkLength(formData, field, min, max) {
  const value = formData.get(field);
  const input = document.querySelector(`[id="${field}"]`);

  if (!input) return false;

  if (value.length < min) {
    showError(input, `${field} must be at least ${min} characters`);
    return false;
  } else if (value.length > max) {
    showError(input, `${field} must be less that ${max} characters`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkEmail(value) {
  const input = document.querySelector("[id='email']");
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!re.test(value)) {
    showError(input, "Email is not valid");
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}

function checkPasswordsMatch(password, confirmPassword) {
  const confirmInput = document.querySelector("[id='confirmPassword']");
  if (password !== confirmPassword) {
    showError(confirmInput, "Password do not match");
    return false;
  } else {
    showSuccess(confirmInput);
    return true;
  }
}

function checkRequired(formData) {
  let isValid = true;

  formData.forEach((value, key) => {
    const input = document.querySelector(`[id="${key}"]`);

    if (value === "") {
      showError(input, `${key} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}

function showError(input, message) {
  const group = input.parentElement;
  const inputEl = group.querySelector("input");
  inputEl.classList.remove("border-gray-300");
  inputEl.classList.add("border-red-500");
  const small = group.querySelector("small");
  small.classList.remove("hidden");
  small.classList.add("block");
  small.innerText = message;
}

function showSuccess(input) {
  const group = input.parentElement;
  const inputEl = group.querySelector("input");
  inputEl.classList.remove("border-gray-300");
  inputEl.classList.remove("border-red-500");
  inputEl.classList.add("border-emerald-500");
  const small = group.querySelector("small");
  small.classList.add("hidden");
  small.classList.remove("block");
}
