const { urlWithBugId } = require("./utils/utils");

describe("contacts", async () => {
  it("верстка адаптируется под ширину экрана", async function ({ browser }) {
    await urlWithBugId("http://localhost:3000/hw/store/contacts", browser);

    await browser.assertView("contacts", ".Contacts");

    await browser.setWindowSize(570, 1080);

    await browser.assertView("contacts-small", ".Contacts");
  });
});
