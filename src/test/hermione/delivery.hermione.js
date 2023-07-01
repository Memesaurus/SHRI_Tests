const { urlWithBugId } = require("./utils/utils");

describe("delivery", async () => {
  it("верстка адаптируется под ширину экрана", async function ({ browser }) {
    await urlWithBugId("http://localhost:3000/hw/store/delivery", browser);

    await browser.assertView("delivery", ".Delivery");

    await browser.setWindowSize(570, 1080);

    await browser.assertView("delivery-small", ".Delivery");
  });
});
