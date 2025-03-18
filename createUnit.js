const { Builder, Browser, By, Key, until, Actions } = require('selenium-webdriver')
const fs = require('fs')
const chrome = require('selenium-webdriver/chrome')


const options = new chrome.Options()
const resX = 1920
const resY = 1080

// Режим запуска теста без открытия окна браузера 
// options.addArguments("--headless",)

const driver = new Builder()
  .setChromeOptions(options)
  .forBrowser('chrome')
  .build()


const SITE_URL = "https://.../"

let events = [];


(async function () {
  try {
    // Настройки браузера
    await additionalConfiguration(resX, resY, 20000, 20000, 20000)
    // Открытие сайта
    await openUrl(SITE_URL)
    // Принятие исключения безопасности
    await confirmSecurityException()
    // Авторизация
    await auth()
    // Переход в раздел ...
    await goToNomenclature()
    // Создание нового ...
    await createNewDirectory()
    // Создание нового ...
    await createNewUnit()
    // Проверка информации в блоке "..."
    await checkDetailInfo()
    // Успешное завершение теста
    logEvent("...", "Все шаги теста успешно пройдены")
    successProcess()
  } catch (error) {
    errorProcess(error)
  } finally {
    await driver.quit()
  }
})()


async function additionalConfiguration(screenWidth = 1920, screenHeight = 1080, script = 30000, implicit = 30000, pageLoad = 30000) {
  logEvent("Браузер", "Запуск теста создания нового юнита");
  logEvent("Браузер", "Настройка браузера на разрешение " + screenWidth + "x" + resY);
  await driver.manage().setTimeouts({ script: script, implicit: implicit, pageLoad: pageLoad });
  logEvent("Браузер", "Настройка временных лимитов");
  await driver.manage().window().setRect({ width: screenWidth, height: screenHeight });
  logEvent("Браузер", "Настройки завершены");
}

async function openUrl(url) {
  logEvent("Браузер", "Открытие адреса: " + url);
  await driver.get(url);
  logEvent("Браузер", "Открытие завершено");
}

async function confirmSecurityException() {
  logEvent("Браузер", "Принятие исключения безопасности");
  await driver.findElement(By.id("details-button")).click();
  await driver.findElement(By.id("proceed-link")).click();
  logEvent("Страница авторизации", "Исключение безопасности подтверждено");
}

async function auth() {
  logEvent("Страница авторизации", "Авторизация ...");
  await driver.findElement(By.id("login")).sendKeys('...');
  await driver.findElement(By.id("password")).sendKeys('...');
  await driver.findElement(By.css("button.ant-btn.css-8ztnga.ant-btn-primary.ant-btn-lg")).click();
  // Проверяем отображение имени пользователя ("...") в верхнем меню справа
  const userName = await driver
    .findElement(By.className("name___CND2i"))
    .getText();
  if (userName === '...') {
    logEvent("Главная страница", "Авторизация завершена");
  }
}

async function goToNomenclature() {
  logEvent("Главная страница", "Переход в раздел ...");
  await driver.findElement(By.css("div.dx-scrollview-content > div > ul > li:nth-child(5) > div")).click();
  await driver.findElement(By.css("li:nth-child(10).ant-menu-item.notFavoritedYet___Ozqli")).click();

  // Проверяем отображение названия раздела ("...") в верхнем меню справа
  const pageName = await driver
    .findElement(By.className("title___1Q1ww"))
    .getText();
  if (pageName === '...') {
    logEvent("Раздел ...", "Переход в раздел ... завершен");
  }
}

async function createNewDirectory() {
  logEvent("Раздел ...", "Создание нового каталога в ...");
  logEvent("Раздел ...", "Ввод данных в поля ..., ..., ..., проверка наличия значения '...' в поле ...");
  await driver.sleep(3000);
  await driver.findElement(By.css(".ant-btn:nth-child(1) > span:nth-child(2)")).click();
  await driver.findElement(By.id("group_Code")).click();
  await driver.findElement(By.id("group_Code")).sendKeys("55555");
  await driver.findElement(By.css(".ant-select-selection-item")).click();
  await driver.findElement(By.id("group_Name")).sendKeys("Catalog");

  // Проверяем отображение значения '...' в поле ...
  const catalog = await driver
    .findElement(By.className("ant-select-selector"))
    .getText();
  if (catalog === '...') {
    await driver.findElement(By.id("group_Description")).click();
    await driver.findElement(By.id("group_Description")).sendKeys("TEST catalog");
    await driver.findElement(By.css(".form-footer___bQM0a > .ant-btn-text")).click();
  }
  else {
    logEvent("...", "В поле '...' не отображается значение '...'");
    throw new Error("В поле '...' не отображается значение '...'");
  }
  await driver.sleep(3000);

  // Проверяем ввод данных в полях .., .., .. и создание нового ...
  const codeName = await driver
    .findElement(By.id("group_Code"))
    .getAttribute("value");
  const catName = await driver
    .findElement(By.id("group_Name"))
    .getAttribute("value");
  const descName = await driver
    .findElement(By.id("group_Description"))
    .getText();
  const newCatName = await driver
    .findElement(By.css(".form-header___cIzHz > span"))
    .getText();
  if (codeName === "55555" && catName === "Catalog" && descName === "TEST catalog" && newCatName === "[55555] Catalog") {
    logEvent("Раздел ...", "Ввод данных в полях '...', '...', '...', проверка наличия значения '...' в поле ... прошли успешно");
    logEvent("Раздел ...", "Новый ... в ... создан");
  }
  else {
    logEvent("Раздел ...", "Ошибка создания нового ... в ...");
    throw new Error("Ошибка создания нового ... в ...");
  }
}

async function createNewUnit() {
  logEvent("Раздел ...", "Создание новой ...");
  logEvent("Раздел ...", "Проверка обязательности полей '...', '...', '...', '...'");
  await driver.findElement(By.css(".ant-btn:nth-child(2) > span:nth-child(2)")).click();
  await driver.sleep(3000);
  await driver.findElement(By.id("assemblyUnit_Article")).click();
  await driver.findElement(By.id("assemblyUnit_Article")).sendKeys("10101");
  await driver.findElement(By.css(".form-footer___bQM0a > .ant-btn-text > span")).click();
  await driver.sleep(2000);

  // Проверяем отображение текста "..." под обязательными полями и текста "..." в верхней правной части страницы
  const reqCode = await driver
    .findElement(By.css("#assemblyUnit_Code_help > div"))
    .getText();
  const reqName = await driver
    .findElement(By.css("#assemblyUnit_Name_help > div"))
    .getText();
  const reqTagName = await driver
    .findElement(By.css("#assemblyUnit_TagNames_help > div"))
    .getText();
  const reqType = await driver
    .findElement(By.css("#assemblyUnit_Type_help > div"))
    .getText();
  const newUnitTag = await driver
    .findElement(By.css("div.form-header___cIzHz > div > div > span"))
    .getText();

  if (reqCode === "..." && reqName === "..." && reqTagName === "..." && reqType === "..." && newUnitTag === "...") {
    logEvent("Раздел ...", "Проверка обязательности полей '...', '...', '...', '...' прошла успешно, новая ... не создана");
  }
  else {
    logEvent("Раздел ...", "Ошибка создания нового ... в ...");
    throw new Error("Ошибка проверки обязательности полей '...', '...', '...', '...' прошла успешно");
  }

  logEvent("Раздел...", "Заполнение полей '...', '...', '...', '...', '...', '...', '...', '...'");
  await driver.findElement(By.id("assemblyUnit_Code")).click();
  await driver.findElement(By.id("assemblyUnit_Code")).sendKeys("12345");
  await driver.findElement(By.id("assemblyUnit_Name")).click();
  await driver.findElement(By.id("assemblyUnit_Name")).sendKeys("test12345");

  // Проверяем, что поле "..." содержит наименование созданного нами ранее ...
  const newUnitCatalog = await driver
    .findElement(By.className("ant-select-selector"))
    .getText();
  if (newUnitCatalog === '[55555] Catalog') {
    await driver.wait(until.elementIsVisible(driver.findElement(By.className("ant-select-selector"))));
    await driver.findElement(By.className("ant-select-selector")).click();
    await driver.findElement(By.className("ant-select-selector")).click();
  }
  else {
    logEvent("...", "В поле '...' не отображается наименование созданного ранее ...");
    throw new Error("В поле '...' не отображается наименование созданного ранее ...");
  }

  await driver.findElement(By.css(".ant-select-selection-overflow")).click();
  await driver.findElement(By.css(".ant-select-item:nth-child(1) .ant-checkbox-input")).click();
  await driver.findElement(By.css(".ant-select-selection-overflow")).click();
  await driver.findElement(By.id("assemblyUnitType")).click();
  await driver.findElement(By.id("assemblyUnitType")).sendKeys("ДСЕ");
  await driver.sleep(2000);
  await driver.findElement(By.id("assemblyUnitType")).sendKeys(Key.ENTER);
  await driver.sleep(2000);
  await driver.findElement(By.id("assemblyUnit_Comment")).click();
  await driver.findElement(By.id("assemblyUnit_Comment")).click();
  await driver.findElement(By.id("assemblyUnit_Comment")).sendKeys("Test description");

  // Загрузка тестового изображения
  let uploadButton = await driver.findElement(By.css('.ant-upload:nth-child(1)'));
  await driver.executeScript('arguments[0].scrollIntoView({ behavior: "smooth", block: "center", inline: "center" })', uploadButton);
  await driver.sleep(3000);
  const fileInput = await driver.findElement(By.css('input[type="file"]'));
  const fileJpgPath = 'C:/.../.../.../.../images/....jpg';
  await fileInput.sendKeys(fileJpgPath);

  logEvent("Раздел ...", "Заполнение полей '...', '...', '...', '...', '...', '...', '...', '...' прошло успешно");
  await driver.sleep(2000);
  await driver.findElement(By.css(".form-footer___bQM0a > .ant-btn-text > span")).click();
  await driver.sleep(2000);
  logEvent("Раздел ...", "Новая ... успешно создана");
}




function logEvent(screen, action) {
  const date = new Date()
  let hr = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours()
  let mt = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes()
  let sc = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds()
  const event = "[" + hr + ":" + mt + ":" + sc + "] Место: " + screen + " | Действие: " + action + "\n";

  console.log(event)
  events.push(event)
}

function makeScreenshot() {
  driver.takeScreenshot().then(
    function (image) {
      const date = new Date()
      let yr = date.getFullYear();
      let mn = date.getMonth() + 1;
      let dt = date.getDate();
      let hr = (date.getHours() < 10) ? "0" + date.getHours() : date.getHours();
      let mt = (date.getMinutes() < 10) ? "0" + date.getMinutes() : date.getMinutes();
      let sc = (date.getSeconds() < 10) ? "0" + date.getSeconds() : date.getSeconds();
      require('fs').writeFileSync('images/...' + yr + '_' + mn + '_' + dt + '_' + hr + '_' + mt + '_' + sc + '.png', image, 'base64');
    }
  );
}


async function successProcess() {
  makeScreenshot()
}

async function errorProcess(error) {
  console.error("[Ошибка] " + error.name + ": " + error.message)
  makeScreenshot()
}
