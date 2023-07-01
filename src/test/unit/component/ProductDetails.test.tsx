import React from "react";
import { describe } from "@jest/globals";
import {
  initStubStore,
  renderWithStubs,
} from "../utils";
import { ProductDetails } from "../../../client/components/ProductDetails";
import events from "@testing-library/user-event";
import { CartState, Product } from "../../../common/types";
import { initStore } from "../../../client/store";


describe("ProductDetails", () => {
  const stubProduct: Product = {
    color: "red",
    description: "desc",
    id: 123,
    material: "material",
    name: "name",
    price: 12345,
  };

  describe("отображение данных", () => {
    it("корректно отображает цвет", () => {
      const render = renderWithStubs(<ProductDetails product={stubProduct} />)

      const color = render.queryByText(stubProduct.color);

      expect(color).toBeTruthy();
    });
    
    it("корректно отображает название", () => {
      const render = renderWithStubs(<ProductDetails product={stubProduct} />)

      const name = render.queryByText(stubProduct.name);

      expect(name).toBeTruthy();
    });

    it("корректно отображает цену", () => {
      const render = renderWithStubs(<ProductDetails product={stubProduct} />)

      const price = render.queryByText(`$${stubProduct.price}`);

      expect(price).toBeTruthy();
    });

    it("корректно отображает описание", () => {
      const render = renderWithStubs(<ProductDetails product={stubProduct} />)

      const description = render.queryByText(stubProduct.description);

      expect(description).toBeTruthy();
    });
    
    it("корректно отображает материал", () => {
      const render = renderWithStubs(<ProductDetails product={stubProduct} />)

      const material = render.queryByText(stubProduct.material);

      expect(material).toBeTruthy();
    });
  });

  describe("функционал", () => {
    it("если нажать на кнопку, товар добавиться в корзину", async () => {
      const user = events.setup();
      const store = initStubStore({
        1: { count: 999, name: "name", price: 1123 },
      });
      const render = renderWithStubs(
        <ProductDetails product={stubProduct} />,
        store
      );
      const button = render.getByText("Add to Cart");

      await user.click(button);

      expect(store.getState().cart).toEqual({
        1: { count: 999, name: "name", price: 1123 },
        123: { count: 1, name: stubProduct.name, price: stubProduct.price },
      } as CartState);
    });

    it("если нажать на кнопку и товар уже в корзине, увеличит количество товара", async () => {
      const user = events.setup();
      const store = initStubStore({
        1: { count: 999, name: "name", price: 1123 },
        [stubProduct.id]: { count: 3, name: stubProduct.name, price: stubProduct.price },
      });
      const render = renderWithStubs(
        <ProductDetails product={stubProduct} />,
        store
      );
      const button = render.getByText("Add to Cart");

      await user.click(button);

      expect(store.getState().cart).toEqual({
        1: { count: 999, name: "name", price: 1123 },
        [stubProduct.id]: { count: 4, name: stubProduct.name, price: stubProduct.price },
      } as CartState);
    });
  });
});
