const { cleanUpCart, urlWithBugId } = require("./utils/utils");

describe("header", async () => {
  afterEach(async function ({browser}) {
    await cleanUpCart(browser);
  })
  
  it("Если ширина болье 576px отображается без гамбурега", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/", browser);

    await browser.assertView("headerFull", "nav");
  });

  it("Если ширина меньше 576px, отображает гамбургер, который закрывается если нажать на элемент", async function ({
    browser,
  }) {
    await browser.setWindowSize(570, 6000);
    await urlWithBugId("http://localhost:3000/hw/store/", browser);

    await browser.assertView("headerBurger", "nav");

    const burgerBtn = browser.$("nav").$("button");
    await burgerBtn.click();

    await browser.assertView("headerBurger-Open", "nav", {
      screenshotDelay: 1000
    });

    const link = browser.$$("a")[3];
    await link.click();

    await browser.assertView("headerBurger-AfterClick", "nav", {
      screenshotDelay: 1000
    });
  });

  it("Содержимое корзины должно меняться между перезагрузками страницы", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);

    const addBtn = browser.$$("p")[2].$("button");
    await addBtn.click();

    await browser.assertView("cart", "nav a[href='/hw/store/cart']");
    await browser.refresh();
    await browser.assertView("cart-refreshed", "nav a[href='/hw/store/cart']");
  });
});
