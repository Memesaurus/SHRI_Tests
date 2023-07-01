const {
  mockCatalogRequest,
  cleanUpCart,
  urlWithBugId,
} = require("./utils/utils");

describe("catalog", async function () {
  afterEach(async function ({ browser }) {
    cleanUpCart(browser);
  });

  it("верстка адаптируется под ширину экрана", async function ({ browser }) {
    await browser.setWindowSize(1920, 4000);
    await mockCatalogRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog", browser);

    await browser.assertView("catalog", ".Catalog");

    await browser.setWindowSize(800, 5000);

    await browser.assertView("catalog-small", ".Catalog");
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
