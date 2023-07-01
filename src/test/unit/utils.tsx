import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ExampleApi, CartApi } from "../../client/api";
import { initStore } from "../../client/store";
import { Store } from "redux";
import { CartState } from "../../common/types";

export const renderWithStubs = (children: JSX.Element, store: Store = initStubStore()) => {
  return render(
    <BrowserRouter>
      <Provider store={store}>{children}</Provider>
    </BrowserRouter>
  );
};

export const initStubStore = (
  stubState: CartState = {},
  apiStub: ExampleApi = new ExampleApi("/")
) => {
  const cartStub = new CartApi();

  if (stubState) {
    cartStub.setState(stubState);
  }

  return initStore(apiStub, cartStub);
};
