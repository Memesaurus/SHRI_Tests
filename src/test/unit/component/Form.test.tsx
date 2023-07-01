import React from "react";
import { describe } from "@jest/globals";
import { renderWithStubs } from "../utils";
import { Form } from "../../../client/components/Form";
import events from "@testing-library/user-event";

//Баг в домашке: до и после валидного номера можно писать что угодно и оно пройдет (12345678910testest проходит)
describe("Form", () => {
  it("вызывает onSubmit, если введенные данные валидные", async () => {
    const mockSubmit = jest.fn();
    const user = events.setup();
    const render = renderWithStubs(<Form onSubmit={mockSubmit} />);
    const nameInput = render.getByTestId("f-name");
    const phoneInput = render.getByTestId("f-phone");
    const addressInput = render.getByTestId("f-address");
    const button = render.getByTestId("f-button");

    await user.type(nameInput, "Name");
    await user.type(phoneInput, "12345678910");
    await user.type(addressInput, "address");
    await user.click(button);

    expect(mockSubmit).toHaveBeenCalled();
  });

  it("если данные пустые, то onSubmit не вызывается", async () => {
    const mockSubmit = jest.fn();
    const user = events.setup();
    const render = renderWithStubs(<Form onSubmit={mockSubmit} />);
    const button = render.getByTestId("f-button");

    await user.click(button);

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it("если данные невалидные, то onSubmit не вызывается", async () => {
    const mockSubmit = jest.fn();
    const user = events.setup();
    const render = renderWithStubs(<Form onSubmit={mockSubmit} />);
    const phoneInput = render.getByTestId("f-phone");
    const button = render.getByTestId("f-button");

    await user.type(phoneInput, "Я невалидный номер");
    await user.click(button);

    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
