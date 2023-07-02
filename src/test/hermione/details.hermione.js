const { assert } = require("chai");
const {
  mockDetailsRequest,
  cleanUpCart,
  urlWithBugId,
} = require("./utils/utils.js");

describe("details", async function () {
  afterEach(async function ({ browser }) {
    await cleanUpCart(browser);
    await browser.mockRestoreAll();
    await browser.refresh();
  });

  it("верстка адаптируется под ширину экрана", async function ({ browser }) {
    await mockDetailsRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);

    await browser.assertView("details", ".Product");

    await browser.setWindowSize(570, 1080);

    await browser.assertView("details-small", ".Product");
  });

  //тест написал после того, как почекал багайдишки, поэтому по хорошему вот этот тест можно не засчитывать
  it("данные отображаются корректно", async function ({ browser }) {
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);

    const card = await browser.$(".Product");
    const h1 = await card.$("h1").getText();
    const [description, price] = await card.$$("p").map((p) => p.getText());
    const [color, material] = await card.$$("dd").map((dd) => dd.getText());

    assert.isNotEmpty(h1, "h1 is empty");
    assert.isNotEmpty(description, "description is empty");
    assert.isNotEmpty(price.slice(1), "price is empty");
    assert.isNotEmpty(color, "color is empty");
    assert.isNotEmpty(material, "material is empty");
  });

  it("отображает надпись, если товар в корзине", async function ({ browser }) {
    await mockDetailsRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);

    const button = browser.$(".Product").$("button");
    button.click();

    await browser.assertView("details-inCart", ".Product");
  });
});
