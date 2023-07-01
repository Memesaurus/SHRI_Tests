import { describe } from "@jest/globals";
import { initStubStore, renderWithStubs } from "../utils";
import { Catalog } from "../../../client/pages/Catalog";
import React from "react";
import { waitFor } from "@testing-library/react";
import { ExampleApi } from "../../../client/api";

describe("Catalog", () => {
  it("корректно отображает данные, которые фетчит с апи", async () => {
    const mockGetProducts = jest.fn().mockResolvedValue({data: [
        { id: 1, name: "name1", price: 123 },
        { id: 2, name: "name2", price: 321 },
      ]});
    const stubApi = new ExampleApi("/");
    stubApi.getProducts = mockGetProducts;
    const store = initStubStore(null, stubApi);
    const render = renderWithStubs(<Catalog />, store);


    await waitFor(() => {
        expect(mockGetProducts).toBeCalled();
        const actualItems = render.getAllByTestId("catalogItem");

        expect(actualItems.length).toBe(2);
    })
  });
});
