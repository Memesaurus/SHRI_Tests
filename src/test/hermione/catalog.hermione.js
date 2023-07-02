const { assert } = require("chai");
const {
  mockCatalogRequest,
  cleanUpCart,
  urlWithBugId,
} = require("./utils/utils");

describe("catalog", async function () {
  afterEach(async function ({ browser }) {
    cleanUpCart(browser);
    await browser.mockRestoreAll();
  });

  it("верстка адаптируется под ширину экрана", async function ({ browser }) {
    await browser.setWindowSize(1920, 4000);
    await mockCatalogRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog", browser);

    await browser.assertView("catalog", ".Catalog");

    await browser.setWindowSize(800, 5000);

    await browser.assertView("catalog-small", ".Catalog");
  });

  //тест написал после того, как почекал багайдишки, поэтому по хорошему вот этот тест можно не засчитывать
  it("данные отображаются корректно", async function ({ browser }) {
    await urlWithBugId("http://localhost:3000/hw/store/catalog", browser);

    const card = await browser.$(".ProductItem");
    const h5 = await card.$("h5").getText();
    const p = await card.$("p").getText();

    assert.isNotEmpty(h5, "h5 is empty");
    assert.isNotEmpty(p, "p is empty");
  });

  it("если элемент в корзине, отображает надпись", async function ({
    browser,
  }) {
    await mockCatalogRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);
    const button = browser.$(".Product").$("button");
    await button.click();
    await urlWithBugId("http://localhost:3000/hw/store/catalog", browser);

    await browser.assertView(
      "catalogCard-afterAddingToCart",
      "div[data-testid='0']"
    );
  });
});
