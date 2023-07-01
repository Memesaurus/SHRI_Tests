const { cleanUpCart, urlWithBugId, mockCart } = require("./utils/utils");

describe("cart", async function () {
  afterEach(async function ({ browser }) {
    await cleanUpCart(browser);
  });

  it("верстка подстраивается под ширину экрана", async function ({ browser }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);

    await browser.assertView("cart-noItems", ".Cart");

    await browser.setWindowSize(301, 1080);

    await browser.assertView("cart-noItems-small", ".Cart");
  });

  it("верстка с элементами в корзине адаптируется под ширину экрана", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    await browser.assertView("cart-withItems", ".Cart");

    await browser.setWindowSize(301, 1080);

    await browser.assertView("cart-withItems-small", ".Cart");
  });

  it("при корректных данных отображается сообщение", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    const [name, phone] = await browser.$(".Form").$$("input");
    const address = await browser.$(".Form").$("textarea");
    await name.addValue("name");
    await phone.addValue("12345678910");
    await address.addValue("address");
    await button.click();

    await browser.assertView("form-success", ".Cart", {
      screenshotDelay: 1000,
    });
  });

  it("при некорректном вводе данных в форму отображается ошибка", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    await button.click();

    await browser.assertView("form-errors", ".Form", {
      screenshotDelay: 1000,
    });
  });

  it("при некорректном вводе имени в форму отображается ошибка", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    const [name, phone] = await browser.$(".Form").$$("input");
    const address = await browser.$(".Form").$("textarea");
    await phone.addValue("12345678910");
    await address.addValue("address");
    await button.click();

    await browser.assertView("form-beforeClick-noName", ".Form", {
      screenshotDelay: 1000,
    });
  });

  it("при некорректном вводе телефона в форму отображается ошибка", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    const [name, phone] = await browser.$(".Form").$$("input");
    await name.addValue("name");
    const address = await browser.$(".Form").$("textarea");
    await phone.addValue("123");
    await address.addValue("address");
    await button.click();

    await browser.assertView("form-beforeClick-noPhone", ".Form", {
      screenshotDelay: 1000,
    });
  });

  it("при некорректном вводе адреса в форму отображается ошибка", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    const [name, phone] = await browser.$(".Form").$$("input");
    const address = await browser.$(".Form").$("textarea");
    await name.addValue("name");
    await phone.addValue("12345678910");
    await button.click();

    await browser.assertView("form-beforeClick-noAddress", ".Form", {
      screenshotDelay: 1000,
    });
  });

  it("при изменении имени на корректное ошибка пропадает", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    await button.click();
    const [name, phone] = await browser.$(".Form").$$("input");
    await name.addValue("name");

    await browser.assertView("form-afterClick-noNameError", ".Form", {
      screenshotDelay: 1000,
    });
  });

  it("при изменении телефона на корректное ошибка пропадает", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    await button.click();
    const [name, phone] = await browser.$(".Form").$$("input");
    await phone.addValue("12345678910");

    await browser.assertView("form-afterClick-noPhoneErorr", ".Form", {
      screenshotDelay: 1000,
    });
  });

  it("при изменении адреса на корректное ошибка пропадает", async function ({
    browser,
  }) {
    await urlWithBugId("http://localhost:3000/hw/store/cart", browser);
    await mockCart(browser);
    await browser.refresh();

    const button = browser.$(".Form").$("button");
    await button.click();
    const address = await browser.$(".Form").$("textarea");
    await address.addValue("123");

    await browser.assertView("form-afterClick-noAddrressError", ".Form", {
      screenshotDelay: 1000,
    });
  });
});
