import React from "react";
import { describe } from "@jest/globals";
import { initStubStore, renderWithStubs } from "../utils";
import { Cart } from "../../../client/pages/Cart";
import { CartState } from "../../../common/types";
import events from "@testing-library/user-event";
import { ExampleApi } from "../../../client/api";
import { checkoutComplete } from "../../../client/store";

describe("Cart", () => {
  describe("отображение данных", () => {
    it("если корзина пустая, отображает сообщение", () => {
      const render = renderWithStubs(<Cart />);

      const message = render.queryByText("Cart is empty.", { exact: false });

      expect(message).toBeTruthy();
    });

    it("сообщение при пустой корзине содержит ссылку на каталог", () => {
      const render = renderWithStubs(<Cart />);

      const link = render.getByRole("link", { name: "catalog" });

      expect(link.getAttribute("href")).toBe("/catalog");
    });

    it("если корзина не пустая, корректно отображает элементы", () => {
      const productMap: CartState = {
        1: { count: 1, name: "name1", price: 123 },
        2: { count: 20, name: "name2", price: 444 },
      };
      const store = initStubStore(productMap);
      const render = renderWithStubs(<Cart />, store);

      const elements = [];
      const actual = [];
      for (const key of [1, 2]) {
        elements.push(render.getByTestId(key));
      }
      for (const element of elements) {
        const actualForElement = [];
        actualForElement.push(element.querySelector("th").textContent);
        element
          .querySelectorAll("td")
          .forEach((td) => actualForElement.push(td.textContent));

        actual.push(actualForElement);
      }

      expect(actual).toEqual([
        [
          "1",
          productMap[1].name.toString(),
          `$${productMap[1].price}`,
          productMap[1].count.toString(),
          `$${productMap[1].price * productMap[1].count}`,
        ],
        [
          "2",
          productMap[2].name.toString(),
          `$${productMap[2].price}`,
          productMap[2].count.toString(),
          `$${productMap[2].price * productMap[2].count}`,
        ],
      ]);
    });
  });

  describe("функционал", () => {
    it("если нажать на кнопку с товарами в корзине, корзина очистится", async () => {
      const user = events.setup();
      const store = initStubStore({
        1: { count: 1, name: "123", price: 123 },
      });
      const render = renderWithStubs(<Cart />, store);
      const button = render.getByText("Checkout");

      await user.click(button);

      expect(store.getState().cart).toMatchObject({});
    });

    it("если нажать на кнопку с товарами в корзине, вызывается чекаут", async () => {
      const user = events.setup();
      const stubApi = new ExampleApi("/");
      const mockCheckout = jest.fn((): any => []);
      stubApi.checkout = mockCheckout;
      const store = initStubStore(
        {
          1: { count: 1, name: "123", price: 123 },
        },
        stubApi
      );
      const render = renderWithStubs(<Cart />, store);
      const nameInput = render.getByTestId("f-name");
      const phoneInput = render.getByTestId("f-phone");
      const addressInput = render.getByTestId("f-address");
      const button = render.getByTestId("f-button");

      await user.type(nameInput, "Name");
      await user.type(phoneInput, "12345678910");
      await user.type(addressInput, "address");
      await user.click(button);

      expect(mockCheckout).toBeCalled();
    });

    it("если нажать на кнопку очистки корзины, корзина очистится", async () => {
      const user = events.setup();
      const store = initStubStore({
        1: { count: 1, name: "123", price: 123 },
      });
      const render = renderWithStubs(<Cart />, store);
      const button = render.getByText("Clear shopping cart");

      await user.click(button);

      expect(store.getState().cart).toMatchObject({});
    });

    it("если очистить корзину, появится сообщение со ссылкой", async () => {
      const user = events.setup();
      const store = initStubStore({
        1: { count: 1, name: "123", price: 123 },
      });
      const render = renderWithStubs(<Cart />, store);
      const button = render.getByText("Clear shopping cart");

      await user.click(button);
      const message = render.queryByText("Cart is empty.", { exact: false });

      expect(message).toBeTruthy();
    });

    it("корректно отображается номер заказа", () => {
      const stubStore = initStubStore();
      stubStore.dispatch(checkoutComplete(12));
      const render = renderWithStubs(<Cart />, stubStore);

      const message = render.queryByText("has been successfully completed", {
        exact: false,
      });

      expect(message.textContent).toEqual(
        "Order #12 has been successfully completed."
      );
    });
  });
});
