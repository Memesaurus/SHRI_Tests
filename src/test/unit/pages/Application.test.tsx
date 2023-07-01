import React from "react";
import { describe } from "@jest/globals";
import { initStubStore, renderWithStubs } from "../utils";
import { Application } from "../../../client/Application";

describe("Header", () => {
  it("в шапке корректно отображаются ссылки на страницы магазина", () => {
    const render = renderWithStubs(<Application />);
    const expected = ["/", "/catalog", "/delivery", "/contacts", "/cart"];

    const links = render.queryAllByRole("link");

    expect(links.map((l) => l.getAttribute("href"))).toEqual(expected);
  });

  it("в шапке корректно отображается размер корзины", () => {
    const store = initStubStore({
      1: { count: 10, name: "123", price: 123 },
      2: { count: 100, name: "1234", price: 1234 },
    });
    const render = renderWithStubs(<Application />, store);

    const link = render.getByText("Cart", {exact: false});

    expect(link.textContent).toEqual("Cart (2)");
  });
});
