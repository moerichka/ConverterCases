const $form = document.querySelector(".form");
const $resultOutput = document.querySelector(".OutputResult");
const regExp = /[А-Яа-я]/;

document.addEventListener("submit", (event) => {
  const data = new FormData($form); // получаем данные с формы
  let output = {};

  for (const entry of data) {
    output[entry[0]] = entry[1];
  } // формируем объект для работы

  if (output?.inputWord?.length >= 3 && output?.inputWord.match(regExp)) {
    // проверка на верность текста
    const converter = new Converter(output);
    converter.convert();
    $resultOutput.value = converter.convertedWord;
  } else {
    console.log("Слишком короткое слово или неверные символы");
    $resultOutput.value = "Тут какая-то ошибка! Попробуйте другое слово";
  }

  event.preventDefault();
});

class Converter {
  originalCase; // выбранный падеж
  originalWord; // вписанное слово
  convertedWord; // результат
  middleWord; // без окончания

  // свойства слова
  originalWordProperties = {
    plural: false,
    declination: 1,
    ending: "",
  };

  constructor(originalObject) {
    this.originalCase = originalObject?.case;
    this.originalWord = originalObject?.inputWord?.toLowerCase();
    this.middleWord = this.originalWord

    this.fillProperties();
    console.log(this.middleWord);
  }

  fillProperties() {
    // получаем окончание слова
    this.originalWordProperties.ending =
      this.originalWord[this.originalWord.length - 1];

    // определяем множественное оно или нет
    if (this.originalWordProperties.ending.match(/ы|и/)) {
      this.originalWordProperties.plural = true;
      this.middleWord = this.originalWord.slice(0, -1)
    }

    // склоняем
    if (this.originalWordProperties.ending.match(/а|я/)) {
      this.originalWordProperties.declination = 1;
      this.middleWord = this.originalWord.slice(0, -1)
    } else if (this.originalWordProperties.ending.match(/о|е/)) {
      this.originalWordProperties.declination = 2;
      this.middleWord = this.originalWord.slice(0, -1)
    } else {
    //   this.originalWordProperties.declination = 3;
      this.originalWordProperties.declination = 2;
    }
  }

  convert() {
    if (this.originalWordProperties.plural) { //множественная форма
      
      this.changeByPlural()

    } else {
      switch (
        this.originalWordProperties.declination // склонение
      ) {
        case 1:
            this.changeByDeclination1()
          break;
        case 2:
            this.changeByDeclination2()
          break;
        case 3:
            this.changeByDeclination3()
          break;
      }
    }
  }

  changeByPlural() {
    switch (this.originalCase) {
        case "ImiCase":
          this.convertedWord = this.originalWord;
          break
        case "RodCase":
            this.convertedWord = this.middleWord + "ов"
            break
        case "DatCase":
            this.convertedWord = this.middleWord + "ам"
            break
        case "VinCase":
            this.convertedWord = this.middleWord + "ы"
            break
        case "TvorCase":
            this.convertedWord = this.middleWord + "ами"
            break
        case "PredCase":
            this.convertedWord = "о " + this.middleWord + "ах"
            break
        default:
          return "Что-то пошло не так";
      }
  }
  changeByDeclination1() {
    switch (this.originalCase) {
        case "ImiCase":
          this.convertedWord = this.originalWord;
          break
        case "RodCase":
            this.convertedWord = this.middleWord + "ы"
            break
        case "DatCase":
            this.convertedWord = this.middleWord + "е"
            break
        case "VinCase":
            this.convertedWord = this.middleWord + "у"
            break
        case "TvorCase":
            this.convertedWord = this.middleWord + "ой"
            break
        case "PredCase":
            this.convertedWord = "о " + this.middleWord + "е"
            break
        default:
          return "Что-то пошло не так";
      }
  }
  changeByDeclination2() {
    switch (this.originalCase) {
        case "ImiCase":
          this.convertedWord = this.originalWord;
          break
        case "RodCase":
            this.convertedWord = this.middleWord + "а"
            break
        case "DatCase":
            this.convertedWord = this.middleWord + "у"
            break
        case "VinCase":
            this.convertedWord = this.middleWord + "о"
            break
        case "TvorCase":
            this.convertedWord = this.middleWord + "ом"
            break
        case "PredCase":
            this.convertedWord = "о " + this.middleWord + "е"
            break
        default:
          return "Что-то пошло не так";
      }
  }
  changeByDeclination3() {
    switch (this.originalCase) {
        case "ImiCase":
          this.convertedWord = this.originalWord;
          break
        case "RodCase":
            this.convertedWord = this.middleWord + "и"
            break
        case "DatCase":
            this.convertedWord = this.middleWord + "и"
            break
        case "VinCase":
            this.convertedWord = this.middleWord + ""
            break
        case "TvorCase":
            this.convertedWord = this.middleWord + "ю"
            break
        case "PredCase":
            this.convertedWord = "о " + this.middleWord + "и"
            break
        default:
          return "Что-то пошло не так";
      }
  }
}
