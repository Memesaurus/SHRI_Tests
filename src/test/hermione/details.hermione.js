const {
  mockDetailsRequest,
  cleanUpCart,
  urlWithBugId,
} = require("./utils/utils.js");

describe("details", async function () {
  afterEach(async function ({ browser }) {
    await cleanUpCart(browser);
  });

  it("верстка адаптируется под ширину экрана", async function ({ browser }) {
    await mockDetailsRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);

    await browser.assertView("details", ".Product");

    await browser.setWindowSize(570, 1080);

    await browser.assertView("details-small", ".Product");
  });

  it("отображает надпись, если товар в корзине", async function ({ browser }) {
    await mockDetailsRequest(browser);
    await urlWithBugId("http://localhost:3000/hw/store/catalog/0", browser);

    const button = browser.$(".Product").$("button");
    button.click();

    await browser.assertView("details-inCart", ".Product");
  });
});
