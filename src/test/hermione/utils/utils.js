const mockResponse = require("./mockCatalogResponse.json");

const BUG_ID = process.env.BUG_ID;

const mockCatalogRequest = async (browser) => {
  const mockRequest = await browser.mock(
    "http://localhost:3000/hw/store/api/products",
    {
      method: "get",
    }
  );
  await mockRequest.respond(mockResponse);
};

const mockDetailsRequest = async (browser) => {
  const mockRequest = await browser.mock(
    "http://localhost:3000/hw/store/api/products/0",
    {
      method: "get",
    }
  );
  await mockRequest.respond({
    id: 0,
    name: "Small Table",
    description:
      "Ergonomic executive chair upholstered in bonded black leather and PVC padded seat and back for all-day comfort and support",
    price: 990,
    color: "black",
    material: "Concrete",
  });
};

const mockCart = async (browser) => {
  await browser.execute(() => {
    localStorage.setItem(
      "example-store-cart",
      JSON.stringify({
        0: { name: "Incredible Salad", count: 2, price: 347 },
      })
    );
  });
};

const cleanUpCart = async (browser) =>
  await browser.execute(() => {
    localStorage.clear();
  });

const urlWithBugId = async (url, browser) => {
  if (BUG_ID) {
    await browser.url(url + "?bug_id=" + BUG_ID);
  } else {
    await browser.url(url);
  }
};

module.exports = {
  mockCatalogRequest,
  mockDetailsRequest,
  cleanUpCart,
  urlWithBugId,
  mockCart,
};
