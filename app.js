(function () {
  var app = document.getElementById("app");
  var number = document.getElementById("character-number");

  var config = {
    character: parseInt(number.value),
    symbols: true,
    numbers: true,
    uppercase: true,
    lowercase: true,
  };

  var characters = {
    numbers: "0 1 2 3 4 5 6 7 8 9",
    symbols: "! @ # $ % ^ & * ( ) _ - + = { [ } ] ; : < , > . ? /",
    uppercase: "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
    lowercase: "a b c d e f g h i j k l m n o p q r s t u v w x y z",
  };

  app.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  app.elements
    .namedItem("btn-decrement")
    .addEventListener("click", function () {
      if (config.character > 1) {
        config.character--;
        number.value = config.character;
      }
    });

  app.elements
    .namedItem("btn-increment")
    .addEventListener("click", function () {
      config.character++;
      number.value = config.character;
    });

  function btnToggle(element) {
    element.classList.toggle("false");
    element.childNodes[1].classList.toggle("fa-check");
    element.childNodes[1].classList.toggle("fa-times");
  }

  let botones = document.getElementsByClassName("btn");
  for (var i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function () {
      btnToggle(this);
      if (this.id == "btn-symbols") {
        config.symbols = !config.symbols;
      } else if (this.id == "btn-numbers") {
        config.numbers = !config.numbers;
      } else if (this.id == "btn-capital-letters") {
        config.uppercase = !config.uppercase;
      }
    });
  }

  function generatePassword() {
    var result = "";
    var password = "";

    for (key in config) {
      if (config[key] == true) {
        result += characters[key] + " ";
      }
    }
    result = result.trim();
    result = result.split(" ");

    for (var i = 0; i < config.character; i++) {
      password += result[Math.floor(Math.random() * result.length)];
    }

    app.elements.namedItem("password").value = password;
  }

  app.elements.namedItem("btn-generate").addEventListener("click", function () {
    generatePassword();
  });

  function copyPassword() {
    app.elements.namedItem("password").select();
    document.execCommand("copy");
    document.getElementById("copy-alert").classList.add("active");

    setTimeout(function () {
      document.getElementById("copy-alert").classList.remove("active");
    }, 3000);
  }

  app.elements.namedItem("password").addEventListener("click", function () {
    copyPassword();
  });

  generatePassword();
})();
