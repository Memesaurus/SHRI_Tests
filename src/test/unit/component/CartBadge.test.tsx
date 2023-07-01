import React from "react";
import { describe } from "@jest/globals";
import { initStubStore, renderWithStubs } from "../utils";
import { CartBadge } from "../../../client/components/CartBadge";

describe("CartBadge", () => {
  it("если элемент есть в сторе, отображает спан", () => {
    const stubStore = initStubStore({
      123: {
        count: 1,
        name: "test",
        price: 123456,
      },
    });
    const render = renderWithStubs(<CartBadge id={123} />, stubStore);
    const element = render.baseElement.querySelector("span");

    expect(element.innerHTML).toBe("Item in cart");
  });

  it("если элемента в сторе нет, ничего не отображает", () => {
    const render = renderWithStubs(<CartBadge id={123} />);
    const element = render.baseElement.querySelector("span");

    expect(element).toBeNull();
  });
});
