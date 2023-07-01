const { urlWithBugId } = require("./utils/utils");

describe("mainPage", async () => {
  it("верстка адаптируется под ширину экрана", async function ({ browser }) {
    await urlWithBugId("http://localhost:3000/hw/store/", browser);

    await browser.assertView("home", ".Home");

    await browser.setWindowSize(570, 1080);

    await browser.assertView("home-small", ".Home");
  });
});
