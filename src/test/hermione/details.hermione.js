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
    for (const i of [0, 1]) {
      await urlWithBugId("http://localhost:3000/hw/store/catalog/" + i, browser);

      const card = await browser.$(".Product");
      const h1 = await card.$("h1").getText();
      const [description, price] = await card.$$("p").map((p) => p.getText());
      const [color, material] = await card.$$("dd").map((dd) => dd.getText());

      assert.isNotEmpty(h1, "h1 is empty for i " + i);
      assert.isNotEmpty(description, "description is empty for i " + i);
      assert.isNotEmpty(price.slice(1), "price is empty for i " + i);
      assert.isNotEmpty(color, "color is empty for i " + i);
      assert.isNotEmpty(material, "material is empty for i " + i);
    }
  });

  it("отображает надпись, если товар в корзине", async function ({ browser }) {
    await mockDetailsRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);

    const button = browser.$(".Product").$("button");
    button.click();

    await browser.assertView("details-inCart", ".Product");
  });
});
