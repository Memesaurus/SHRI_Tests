import React from "react";
import { describe, expect, it } from "@jest/globals";
import { ProductShortInfo } from "../../../common/types";
import { initStubStore, renderWithStubs } from "../utils";
import { ProductItem } from "../../../client/components/ProductItem";

describe("ProductItem", () => {
  const stubProduct: ProductShortInfo = {
    id: 123,
    name: "product",
    price: 999,
  };

  it("корректно отображает название продукта", () => {
    const expected = stubProduct.name;
    const component = renderWithStubs(<ProductItem product={stubProduct} />);

    const actual = component
      .getByTestId(stubProduct.id)
      .querySelector("h5").textContent;

    expect(actual).toEqual(expected);
  });

  it("корректно отображает цену продукта", () => {
    const expected = `$${stubProduct.price}`;
    const render = renderWithStubs(<ProductItem product={stubProduct} />);

    const actual = render
      .getByTestId(stubProduct.id)
      .querySelector("p").textContent;

    expect(actual).toEqual(expected);
  });

  it("линк содержит ссылку с айдишником товара", () => {
    const expected = `/catalog/${stubProduct.id}`;
    const render = renderWithStubs(<ProductItem product={stubProduct} />);

    const fullLink = render.getByTestId(stubProduct.id).querySelector("a");

    expect(fullLink.getAttribute("href")).toEqual(expected);
  });
});
