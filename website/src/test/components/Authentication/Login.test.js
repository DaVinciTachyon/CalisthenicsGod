import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Login from "../../../components/Authentication/Login";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders Login Widget", async () => {
    await act(async () => {
        render(<Login />, container);
    });

    expect(container.querySelector(".primaryButton").value).toBe("Sign In");
});