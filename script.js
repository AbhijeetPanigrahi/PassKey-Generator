const resultE1 = document.getElementById("result");
const clipboard = document.getElementById("clipboard");
const lengthE1 = document.getElementById("length");
const uppercaseE1 = document.getElementById("uppercase");
const lowercaseE1 = document.getElementById("lowercase");
const numbersE1 = document.getElementById("numbers");
const symbolsE1 = document.getElementById("symbols");
const generateE1 = document.getElementById("generate");

clipboard.addEventListener("click", () => {
  // Create a temporary textarea element to hold the text
  const textarea = document.createElement("textarea");

  // set the inner text of "result" in a variable
  const passkey = resultE1.innerText;

  if (!passkey) {
    return;
  }

  textarea.value = passkey;
  document.body.appendChild(textarea);

  //select  the text in the text area
  textarea.select();

  //command to copy the text
  document.execCommand("copy");

  // remove the temporary textarea
  textarea.remove();
  alert("Passkey is succefully copied");
});

const randomFunc = {
  upper: getRandomUpp,
  lower: getRandomLow,
  number: getRandomNum,
  symbol: getRandomSymb,
};

function getRandomUpp() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomLow() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomNum() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
function getRandomSymb() {
  const symbols = "!@#$%^&*(){}[]=<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

generateE1.addEventListener("click", () => {
  const length = +lengthE1.value;
  const hasLower = lowercaseE1.checked;
  const hasUpper = uppercaseE1.checked;
  const hasNumber = numbersE1.checked;
  const hasSymbol = symbolsE1.checked;

  resultE1.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  const typesCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  // Doesn't have a selected type
  if (typesCount === 0) {
    return "";
  }

  // create a loop
  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}
