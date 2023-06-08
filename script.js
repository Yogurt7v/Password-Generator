const lenghtSlider = document.querySelector(".pass-lenght input");
const options = document.querySelectorAll(".options input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passwordIndicate = document.querySelector(".pass-indicator");
const generateButton = document.querySelector(".generate-btn");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*",
};

const generatePassword = () => {
  let staticPassword = "";
  randomPassword = "";
  encludeDuplicate = false;
  passLenght = lenghtSlider.value;

  options.forEach((options) => {
    if (options.cheched) {
      if (options.id !== "exc-dublicate" && options.id !== "spaces") {
        staticPassword += characters[options.id];
      } else if (options.id === "spaces") {
        staticPassword += "  ${staticPassword}  ";
      } else {
        encludeDuplicate = true;
      }
    }
  });

  for (let i = 0; i < passLenght; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (encludeDuplicate) {
      !randomPassword.inclides(randomChar) | (randomChar == "")
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;
};

const udatePassIndicator = () => {
  passwordIndicate.id =
    lenghtSlider.value <= 8
      ? "Слабый пароль"
      : lenghtSlider.value <= 16
      ? "Средняя надёжность"
      : "Отличный пароль"; /*возможно тут ошибка .. замена на  passwordIndicate*/
};

const updateSlider = () => {
  document.querySelector(".pass-lenght span").innerText = lenghtSlider.value;
  generatePassword();
  udatePassIndicator();
};

updateSlider();

const copyPassword = () => {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.innerText = "Checked";
  copyIcon.style.color = "#4285f4";
  setTimeout(() => {
    copyIcon.innerText = "copy_all";
    copyIcon.style.color = "#707070";
  }, 1500);
};

copyIcon.addEventListener("click", copyPassword);
lenghtSlider.addEventListener("input", updateSlider);

generateButton.addEventListener("click", generatePassword);
